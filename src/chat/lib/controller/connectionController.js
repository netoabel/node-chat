'use strict';

function ConnectionController(handler) {
  this._handler = handler;
}

ConnectionController.prototype = {
  constructor: ConnectionController,

  onConnect: function (userId, connectionId) {
    var self = this;
    this._handler.createUser(userId, connectionId, function (user) {
      self._handler.addToUserList(user);
    });
  },

  onDisconnect: function (userId) {
    this._handler.destroyUser(userId);
  }

};

module.exports = ConnectionController;