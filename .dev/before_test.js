global.Meteor = require("meteor/meteor");
global._ = require("underscore");
global.Moment = require("moment");

window.Meteor = { isServer: true };
window.Moment = global.Moment;

global.__meteor_runtime_config__ = true;

window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};
