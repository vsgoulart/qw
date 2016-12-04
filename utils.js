#!/usr/bin/env node

"use strict"

const cmd = require("node-cmd");
const _ = require("lodash");

const utils = {};

utils["execute"] = function(command, environment = "") {
    if(this.isCustomCommand(command))
        this.openURL(this.getCustomURL(command));
    else
        this.openURL(command);
};

utils["checkPrefix"] = function(url) {
    if(this.isValidURL(url))
        return url;
    else
        return "http://" + url;
};

utils["isValidURL"] = function(url) {
    return _.startsWith(url, "http://") || _.startsWith(url, "https://");
};

utils["isCustomCommand"] = function(command) {
    return false;
};

utils["openURL"] = function(url) {
    cmd.run("start " + this.checkPrefix(url));
};

utils["getCustomURL"] = function(command) {
    return "";
};

module.exports = utils;