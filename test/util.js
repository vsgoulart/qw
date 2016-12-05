#!/usr/bin/env node

"use strict"

const utils = require("../utils");
const expect = require("chai").expect;

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
        it("should return a boolean", function(done) {
            var result = utils.isCustomCommand("test");

            expect(result).to.be.a("boolean");

            done();
        });
    });
});