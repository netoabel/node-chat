'use strict';

function ConnectionDAO(users, dao){
  this.users = users;
  this.dao = dao;
}

ConnectionDAO.prototype = {
  constructor: ConnectionDAO,

  onConnect: function (data, callback) {
    var self = this;
    this.dao.getUser(data.userId).then(function (result) {
      if(result && data.connectionId) {
        result.setConnectionId(data.connectionId);
        self.users.add(result);
      }
      if(callback){
        callback();
      }
    });
  },
  
  onDisconnect: function (data, callback) {
    this.users.remove({connectionId: data.connectionId});
    if(callback){
      callback();
    }
  }
};

module.exports = ConnectionDAO;