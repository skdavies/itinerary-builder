module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var UserSchema = require('./user.schema.server')();
  var UserModel = mongoose.model('UserModel', UserSchema);

  return api;

  function createUser(user) {
    var deferred = q.defer();
    UserModel.create(user, function (err, usr) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(usr);
      }
    });
    return deferred.promise;
  }

  function findUserById(userId) {
    var deferred = q.defer();
    UserModel.findById(userId, function (err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

  function findUserByUsername(username) {
    var deferred = q.defer();
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

  function findUserByCredentials(username, password) {
    var deferred = q.defer();
    UserModel.findOne({ username: username, password: password }, function (err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

  function updateUser(userId, user) {
    var deferred = q.defer();
    UserModel.findOneAndUpdate({ _id: userId }, { $set: user }, function (err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

  function deleteUser(userId) {
    var deferred = q.defer();
    UserModel.remove({ _id: userId }, function (err) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
};