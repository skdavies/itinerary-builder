module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findAllUsers: findAllUsers,
    findUserByGoogleId: findUserByGoogleId,
    findUserByFacebookId: findUserByFacebookId,
    findFollowingItineraries: findFollowingItineraries,
    findTrendingUsers: findTrendingUsers,
    followUser: followUser,
    unfollowUser: unfollowUser,
    updateUser: updateUser,
    updateProfile: updateProfile,
    deleteUser: deleteUser
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var UserSchema = require('./user.schema.server')();
  var UserModel = mongoose.model('UserModel', UserSchema);

  return api;

  function createUser(user) {
    return UserModel.create(user);
  }

  function findUserById(userId) {
    return UserModel.findById(userId).populate('followers.users following.users');
  }

  function findUserByUsername(username) {
    return UserModel.findOne({ username: username });
  }

  function findAllUsers() {
    return UserModel.find().sort({ username: 'asc' }).select('-password -google -facebook');
  }

  function findFollowingItineraries(userId) {
    return UserModel.findById(userId).populate({
      path: 'following.users',
      populate: {
        path: 'itineraries',
        model: 'ItineraryModel'
      }
    });
  }

  function findTrendingUsers() {
    return UserModel.find({ role: 'USER' }).populate('itineraries').sort({ 'followers.count': -1 });
  }

  function findUserByGoogleId(googleId) {
    return UserModel.findOne({ 'google.id': googleId });
  }

  function findUserByFacebookId(facebookId) {
    return UserModel.findOne({ 'facebook.id': facebookId });
  }

  function followUser(userId, followId) {
    return UserModel.findOneAndUpdate({ _id: followId }, {
      $addToSet: { 'followers.users': userId },
      $inc: { 'followers.count': 1 }
    }, { new: true }).then(function () {
      return UserModel.findOneAndUpdate({ _id: userId }, {
        $addToSet: { 'following.users': followId },
        $inc: { 'following.count': 1 }
      }, { new: true });
    });
  }

  function unfollowUser(userId, unfollowId) {
    return UserModel.findOneAndUpdate({ _id: unfollowId }, {
      $pullAll: { 'followers.users': [userId] },
      $inc: { 'followers.count': -1 }
    }, { new: true }).then(function () {
      return UserModel.findOneAndUpdate({ _id: userId }, {
        $pullAll: { 'following.users': [unfollowId] },
        $inc: { 'following.count': -1 }
      }, { new: true });
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
          lastName: user.lastName
        }
      },
      { new: true });
  }

  function deleteUser(userId) {
    return UserModel.findOneAndRemove({ _id: userId });
  }
};