#!/usr/bin/env node

"use strict"

const program = require("commander");
const utils = require("./utils");
const version = require("./package.json").version;

var cmdValue;
var envValue;

program.version(version);
program.arguments("<cmd> [env]");
program.action(function(cmd, env) {
    cmdValue = cmd;
    envValue = env;
});
program.parse(process.argv);

if(typeof cmdValue === "undefined") {
    console.error("No command given");
    process.exit(1);
}
 
utils.execute(cmdValue, envValue);