module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    findAllUsers: findAllUsers,
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

  function findUserByCredentials(username, password) {
    return UserModel.findOne({ username: username, password: password });
  }

  function findAllUsers() {
    return UserModel.find();
  }

  function followUser(userId, userIdToFollow) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { following: userIdToFollow } }, { new: true }).then(function (user) {
      user.followers.push(userId);
      user.save();
      // UserModel.findOneAndUpdate({ _id: userIdToFollow }, { $addToSet: { followers: userId } });
    });
  }

  function updateUser(userId, user) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $set: user })
  }

  function updateProfile(user) {
    return UserModel.findOneAndUpdate({ _id: user._id }, {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  }

  function deleteUser(userId) {
    return UserModel.findOneAndRemove({ _id: userId });
  }
};