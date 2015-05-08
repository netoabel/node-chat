'use strict';

function UserList(){
  this.users = [];
}

UserList.prototype = {
  constructor: UserList,

  add: function (user) {
    if(user && user.name) {
      this.users.push(user);
    }
  }
};

module.exports = UserList;