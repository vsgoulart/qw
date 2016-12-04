#!/usr/bin/env node

"use strict"

const utils = require("../utils");
const expect = require("chai").expect;

describe("util.js", function() {
    describe("when checkPrefix() is called", function() {
        it("should return a string that starts with 'http://' if it didn't before", function(done) {
            var url = utils.checkPrefix("test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("http://test.com");

            done();
        });

        it("should return the same string if the string passed starts with 'http://'", function(done) {
            var url = utils.checkPrefix("http://test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("http://test.com");

            done();
        });

        it("should return the same string if the string passed starts with'https://'", function(done) {
            var url = utils.checkPrefix("https://test.com");

            expect(url).to.be.a("string");
            expect(url).to.be.equal("https://test.com");

            done();
        });
    });

    describe("when pasrseCommand() is called", function() {

    });
});