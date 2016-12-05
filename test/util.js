#!/usr/bin/env node

"use strict"

const utils = require("../utils");
const expect = require("chai").expect;
const fs = require("fs");

utils.customCommandsFilename = "customTest.json";

describe("util.js", function() {
    describe("when fixPrefix() is called", function() {
        it("should return a string that starts with 'http://' if it didn't before", function(done) {
            var url = utils.fixPrefix("test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("http://test.com");

            done();
        });

        it("should return the same string if the string passed starts with 'http://'", function(done) {
            var url = utils.fixPrefix("http://test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("http://test.com");

            done();
        });

        it("should return the same string if the string passed starts with'https://'", function(done) {
            var url = utils.fixPrefix("https://test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("https://test.com");

            done();
        });
    });

    describe("when isValidURL() is called", function() {
        it("should return true when string passed starts with 'http://'", function(done) {
            var result = utils.isValidURL("http://test.com");

            expect(result).to.be.a("boolean");
            expect(result).to.be.equal(true);

            done();
        });

        it("should return true when string passed starts with 'https://'", function(done) {
            var result = utils.isValidURL("https://test.com");

            expect(result).to.be.a("boolean");
            expect(result).to.be.equal(true);

            done();
        });

        it("should return false when string passed don't start with 'http://' or 'https://'", function(done) {
            var result = utils.isValidURL("test.com");

            expect(result).to.be.a("boolean");
            expect(result).to.be.equal(false);

            done();
        });
    });

    describe("when isCustomCommand() is called", function() {
        beforeEach(function(done) {
            fs.writeFile(utils.customCommandsFilename, '[{"commands":"cc"}]', (err) => {
                if (err) throw err;

                done();
            });
        });

        afterEach(function(done) {
            fs.unlinkSync(utils.customCommandsFilename);

            done();
        });

        it("should return a boolean", function(done) {
            var result = utils.isCustomCommand("test");

            expect(result).to.be.a("boolean");

            done();
        });

        it("should return true if command is in file", function(done) {
            var result = utils.isCustomCommand("cc");

            expect(result).to.be.a("boolean").equal(true);

            done();
        });

        it("should return false if command is not in file", function(done) {
            var result = utils.isCustomCommand("dd");

            expect(result).to.be.a("boolean").equal(false);

            done();
        });
    });

    describe("when getDataFromCustomCommandsFile() is called", function() {
        beforeEach(function(done) {
            fs.writeFile(utils.customCommandsFilename, '[{"commands":"cc"}]', (err) => {
                if (err) throw err;

                done();
            });
        });

        afterEach(function(done) {
            fs.unlinkSync(utils.customCommandsFilename);

            done();
        });

        it("should return a string", function(done) {
            var result = utils.getDataFromCustomCommandsFile();

            expect(result).to.be.a("string");

            done();
        });
    });

    describe("when getCustomURL() is called", function() {
        beforeEach(function(done) {
            fs.writeFile(utils.customCommandsFilename, '[{"commands":"github","url":"https://github.com/vsgoulart"}]', (err) => {
                if (err) throw err;

                done();
            });
        });

        afterEach(function(done) {
            fs.unlinkSync(utils.customCommandsFilename);

            done();
        });

        it("should return a string equal to 'https://github.com/vsgoulart' when 'github' is passed as argument", function(done) {
            var result = utils.getCustomURL("github");

            expect(result).to.be.a("string").equal("https://github.com/vsgoulart");

            done();
        });

        it("should return an empty string when a invalid command is passed as argument", function(done) {
            var result = utils.getCustomURL("lul");

            expect(result).to.be.a("string").equal("");

            done();
        });
    });
});