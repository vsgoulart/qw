#!/usr/bin/env node

"use strict"

const fs = require("fs");
const cmd = require("node-cmd");
const _ = require("lodash");

const utils = {};

utils["customCommandsFilename"] = "customCommands.json";

utils["execute"] = function(command, environment = "") {
    if(this.isCustomCommand(command))
        this.openURL(this.getCustomURL(command));
    else
        this.openURL(command);
};

utils["fixPrefix"] = function(url) {
    if(this.isValidURL(url))
        return url;
    else
        return "http://" + url;
};

utils["isValidURL"] = function(url) {
    return _.startsWith(url, "http://") || _.startsWith(url, "https://");
};

utils["openURL"] = function(url) {
    cmd.run("start " + this.fixPrefix(url));
};

utils["isCustomCommand"] = function(command) {
    if(this.getCustomCommands().indexOf(command) !== -1)
        return true;
    else
        return false;
};

utils["getCustomURL"] = function(command) {
    const customCommands = JSON.parse(this.getDataFromCustomCommandsFile());

    function isInCommands(o) {
        return o.commands.includes(command);
    }

    const commandIndex = _.findIndex(customCommands, isInCommands);

    if(commandIndex != -1)
        return customCommands[commandIndex].url;
    else
        return "";
};

utils["getCustomCommands"] = function() {
    if(fs.existsSync(this.customCommandsFilename)) {
        const customCommands = JSON.parse(this.getDataFromCustomCommandsFile());

        if(Array.isArray(customCommands))
            return customCommands.reduce(function(accumulator, currentValue) {
                return accumulator.concat(_.words(currentValue.commands));
            }, []);
    }
    
    return [];
};

utils["getDataFromCustomCommandsFile"] = function() {
    if(fs.existsSync(this.customCommandsFilename)) {
        return fs.readFileSync(this.customCommandsFilename, "utf-8");
    }

    return "";
};

module.exports = utils;