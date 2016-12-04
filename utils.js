#!/usr/bin/env node

"use strict"

const cmd = require("node-cmd");
const _ = require("lodash");

const utils = {};

utils["execute"] = function(command, environment = ""){
    cmd.run("start " + utils.checkPrefix(command));
};

utils["checkPrefix"] = function(url){
    if(_.startsWith(url, "http://") || _.startsWith(url, "https://"))
        return url;
    else
        return "http://" + url;
};

module.exports = utils;