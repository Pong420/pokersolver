var should = require('should');
var Hand = require('../pokersolver').Hand;
var SingleCard = require('../pokersolver').SingleCard;
var Pair = require('../pokersolver').Pair;
var Game = require('../pokersolver').Game;

var gameForTest = new Game('bigtwo');

describe('A Single Card', function() {
  it('should be detected as possible', function() {
    var hand = new SingleCard(['2s'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  return it('should detect the winning hand from a list', function() {
    var h1 = Hand.solve(['2s'], gameForTest);
    var h2 = Hand.solve(['As'], gameForTest);
    var winners = Hand.winners([h1, h2]);
    return winners[0].should.equal(h1);
  });
});

describe('A Pair', function() {
  it('should be detected as possible', function() {
    var hand = new Pair(['5h', '5c'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  it('should be detected as not possible', function() {
    var hand = new Pair(['5h', '6s'], gameForTest);
    return hand.isPossible.should.equal(false);
  });

  // it('should be detected as not possible', function() {
  //   var hand = new Pair(['5h', '6s', '7s'], gameForTest);
  //   return hand.isPossible.should.equal(false);
  // });

  return it('should select the correct winner', function() {
    var h1 = Hand.solve(['2s', '2d'], gameForTest);
    var h2 = Hand.solve(['2h', '2c'], gameForTest);
    var h3 = Hand.solve(['As', 'Ah'], gameForTest);
    var winner1 = Hand.winners([h1, h2]);
    var winner2 = Hand.winners([h1, h3]);
    return winner1[0].should.equal(h1) && winner2[0].should.equal(h1);
  });
});

describe('Triples', function() {
  it('should be detected as possible', function() {
    var hand = new Pair(['5h', '5c', '5s'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  it('should be detected as not possible', function() {
    var h1 = new Pair(['5h', '6s'], gameForTest);
    var h2 = new Pair(['5h', '6s', '7s', '5s'], gameForTest);
    return h1.isPossible.should.equal(false) && h2.isPossible.should.equal(false);
  });

  return it('should select the correct winner', function() {
    var h1 = Hand.solve(['2s', '2d'], gameForTest);
    var h2 = Hand.solve(['2h', '2c'], gameForTest);
    var h3 = Hand.solve(['As', 'Ah'], gameForTest);
    var winner1 = Hand.winners([h1, h2]);
    var winner2 = Hand.winners([h1, h3]);
    return winner1[0].should.equal(h1) && winner2[0].should.equal(h1);
  });
});
