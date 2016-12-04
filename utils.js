#!/usr/bin/env node

"use strict"

const cmd = require("node-cmd");
const _ = require("lodash");

const utils = {};

utils["execute"] = function(command, environment = "") {
    cmd.run("start " + this.checkPrefix(command));
};

utils["checkPrefix"] = function(url) {
    if(this.isValidURL(url))
        return url;
    else
        return "http://" + url;
};

utils["isValidURL"] = function(url) {
    return _.startsWith(url, "http://") || _.startsWith(url, "https://");
}

module.exports = utils;