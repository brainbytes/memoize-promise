
require('es6-promise').polyfill();

var memoize = require('../../src');
var chai = require('chai'), expect = chai.expect;

function asyncWork(num) {
  return new Promise(function(res, rej) {
    window.setTimeout(function() {
      if (num % 2 == 0) {
        res(num);
      } else {
        rej(num);
      }
    }, 100);
  });
};

var mAsyncWork = memoize(asyncWork);

describe('Memoization', function() {

  it('should get a new promise every time without memoization', function() {
    var p1 = asyncWork(0);
    var p2 = asyncWork(0);
    expect(p1).to.not.equal(p2); // .eql for ==
  });

  it('should return the same promise if called twice with the same arguments', function() {
    var p1 = mAsyncWork(0);
    var p2 = mAsyncWork(0);
    expect(p1).to.equal(p2); // .equal for ===
  });

  it('should return a new promise for each input it is given', function() {
    var p1 = mAsyncWork(0);
    var p2 = mAsyncWork(2);
    expect(p1).to.not.equal(p2);
  });

  it('should clear the promise after it is resolved', function(done) {
    var p1 = mAsyncWork(0);
    p1.then(function() {
      window.setTimeout(function() {
        var p2 = mAsyncWork(0);
        expect(p1).to.not.equal(p2);
        done();
      }, 0);
    });
  });

  it('should clear the promise if it is rejected', function(done) {
    var p1 = mAsyncWork(1);
    p1.catch(function() {
      window.setTimeout(function() {
        var p2 = mAsyncWork(1);
        expect(p1).to.not.equal(p2);
        done();
      }, 0);
    });
  });

});
