module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findAllUsers: findAllUsers,
    findUserByGoogleId: findUserByGoogleId,
    findUserByFacebookId: findUserByFacebookId,
    followUser: followUser,
    updateUser: updateUser,
    updateProfile: updateProfile,
    deleteUser: deleteUser
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var UserSchema = require('./user.schema.server')();
  var UserModel = mongoose.model('ProjectUserModel', UserSchema);

  return api;

  function createUser(user) {
    return UserModel.create(user);
  }

  function findUserById(userId) {
    return UserModel.findById(userId);
  }

  function findUserByUsername(username) {
    return UserModel.findOne({ username: username });
  }

  function findAllUsers() {
    return UserModel.find().sort({ username: 'asc' }).select('-password -google -facebook');
  }

  function findUserByGoogleId(googleId) {
    return UserModel.findOne({ 'google.id': googleId });
  }

  function findUserByFacebookId(facebookId) {
    return UserModel.findOne({ 'facebook.id': facebookId });
  }

  function followUser(userId, userIdToFollow) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { following: userIdToFollow } }, { new: true }).then(function (user) {
      user.followers.push(userId);
      user.save();
      // UserModel.findOneAndUpdate({ _id: userIdToFollow }, { $addToSet: { followers: userId } });
    });
  }

  function updateUser(userId, user) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true })
  }

  function updateProfile(user) {
    return UserModel.findOneAndUpdate({ _id: user._id },
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      },
      { new: true });
  }

  function deleteUser(userId) {
    return UserModel.findOneAndRemove({ _id: userId });
  }
};