'use strict';

var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

function Message(data) {
  if (data) {
    this._username = data.username;
    this._text = data.text;
  }
  this._limitSize();
  this._sanitize();
}

Message.prototype = {
  constructor: Message,

  getUserName: function () {
    return this._username;
  },

  getText: function () {
    return this._text;
  },

  _sanitize: function () {
    this._text = entities.encode(this._text);
  },

  _limitSize: function () {
    if (this._text.length > 140) {
      this._text = this._text.substring(0, 140);
    }
  }
};

module.exports = Message;
