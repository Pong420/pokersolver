var should = require('should');
var Hand = require('../pokersolver').Hand;
var SingleCard = require('../pokersolver').SingleCard;
var Pair = require('../pokersolver').Pair;
var Triples = require('../pokersolver').Triples;
var Snake = require('../pokersolver').Snake;
var Flower = require('../pokersolver').Flower;
var FullHouse = require('../pokersolver').FullHouse;
var FourOfAKind = require('../pokersolver').FourOfAKind;
var StraightFlush = require('../pokersolver').StraightFlush;
var Game = require('../pokersolver').Game;

var gameForTest = new Game('bigtwo');

describe('Single Card', function() {
  it('should be detected as possible', function() {
    var hand = new SingleCard(['2s'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  return it('should detect the winning hand from a list', function() {
    var h1 = Hand.solve(['2s'], gameForTest);
    var h2 = Hand.solve(['As'], gameForTest);
    var h3 = Hand.solve(['2d'], gameForTest);
    var winners1 = Hand.winners([h1, h2]);
    var winners2 = Hand.winners([h3, h1]);
    winners1[0].should.equal(h1);
    return winners2[0].should.equal(h1);
  });
});

describe('Pair', function() {
  it('should be detected as possible', function() {
    var hand = new Pair(['5h', '5c'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  it('should be detected as not possible', function() {
    var hand = new Pair(['5h', '6s'], gameForTest);
    return hand.isPossible.should.equal(false);
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

describe('Triples', function() {
  it('should be detected as possible', function() {
    var hand = new Triples(['5h', '5c', '5s'], gameForTest);
    return hand.isPossible.should.equal(true);
  });

  it('should be detected as not possible', function() {
    var h1 = new Triples(['5h', '6s'], gameForTest);
    var h2 = new Triples(['5h', '6s', '7s', '5s'], gameForTest);
    return h1.isPossible.should.equal(false) && h2.isPossible.should.equal(false);
  });

  return it('should select the correct winner', function() {
    var h1 = Hand.solve(['2s', '2d', '2h'], gameForTest);
    var h2 = Hand.solve(['As', 'Ah', 'Ac'], gameForTest);
    var winner1 = Hand.winners([h1, h2]);
    return winner1[0].should.equal(h1);
  });
});

describe('Snake', function() {
  it('should be detected as possible', function() {
    var h1 = new Snake(['5s', '6h', '7s', '8s', '9h'], gameForTest);
    var h2 = new Snake(['As', '2s', '3s', '4h', '5d'], gameForTest);
    var h3 = new Snake(['2d', '3d', '4c', '5h', '6s'], gameForTest);
    var h4 = new Snake(['Ts', 'Jd', 'Qh', 'Kc', 'Ac'], gameForTest);
    return (
      h1.isPossible.should.equal(true) &&
      h2.isPossible.should.equal(true) &&
      h3.isPossible.should.equal(true) &&
      h4.isPossible.should.equal(true)
    );
  });

  it('should be detected as not possible', function() {
    var h1 = new Snake(['3s', '4h', '7s', '6s', '7h'], gameForTest);
    return h1.isPossible.should.equal(false);
  });

  // TODO: compare winners
});

describe('Flower', function() {
  it('should be detected as possible', function() {
    var h1 = new Flower(['1s', '6s', '7s', '8s', '9s'], gameForTest);
    var h2 = new Flower(['Ad', '2d', '9d', '4d', '5d'], gameForTest);
    var h3 = new Flower(['6c', '3c', '4c', '5c', '6c'], gameForTest);
    var h4 = new Flower(['Ah', 'Jh', 'Qh', 'Kh', 'Ah'], gameForTest);
    return (
      h1.isPossible.should.equal(true) &&
      h2.isPossible.should.equal(true) &&
      h3.isPossible.should.equal(true) &&
      h4.isPossible.should.equal(true)
    );
  });

  it('should be detected as not possible', function() {
    var h1 = new Snake(['5s', '6s', '7s', '8s', '9s'], gameForTest);
    var h2 = new Snake(['Ah', '2h', '3h', '4h', '5h'], gameForTest);
    var h3 = new Snake(['2c', '3c', '4c', '5c', '6c'], gameForTest);
    var h4 = new Snake(['Td', 'Jd', 'Qd', 'Kd', 'Ad'], gameForTest);
    return (
      h1.isPossible.should.equal(false) &&
      h2.isPossible.should.equal(false) &&
      h3.isPossible.should.equal(false) &&
      h4.isPossible.should.equal(false)
    );
  });

  // TODO: compare winners
});

describe('A Full House', function() {
  it('should be detected as possible', function() {
    var hand = new FullHouse(['Qd', 'Js', 'Qc', 'Jc', 'Jd'], gameForTest);
    hand.isPossible.should.equal(true);
    hand = new FullHouse(['9c', '9d', 'Jh', 'Jc', '9h'], gameForTest);
    return hand.isPossible.should.equal(true);
  });
  it('should be detected as not possible', function() {
    var hand = new FullHouse(['5h', '3h', '3c', '5d', '2s', 'Ts', 'Td'], gameForTest);
    hand.isPossible.should.equal(false);
    hand = new FullHouse(['5s', '9d', 'Kd', '6h', '7s', '7d', 'Kh'], gameForTest);
    hand.isPossible.should.equal(false);
    hand = new FullHouse(['9h', '9s', '3d', '5c', 'Kd', '5d', 'Kh'], gameForTest);
    return hand.isPossible.should.equal(false);
  });
  return it('should be in order', function() {
    var hand;
    hand = new FullHouse(['9c', 'Qs', '9h', '5h', 'Ts', 'Qc', 'Qh'], gameForTest);
    return hand.cards.toString().should.equal('Qs,Qc,Qh,9c,9h');
  });

  // TODO: compare
});

describe('A Four of a Kind', function() {
  it('should be detected as possible', function() {
    var h1 = new FourOfAKind(['7h', '7d', '3s', '2c', '7s', '7c', '4s'], gameForTest);
    var h2 = new FourOfAKind(['7h', '7d', '7s', '7c'], gameForTest);
    return h1.isPossible.should.equal(true) && h2.isPossible.should.equal(true);
  });
  return it('should be detected as not possible', function() {
    var hand = new FourOfAKind(['7h', '3d', '3s', '2c', '7s', '7c', '4s'], gameForTest);
    return hand.isPossible.should.equal(false);
  });

  // TODO: compare
});

describe('A Straight Flush', function() {
  it('should be detected as possible', function() {
    var hand = new StraightFlush(['Qd', '7s', '8s', 'Js', 'Kh', 'Ts', '9s'], gameForTest);
    return hand.isPossible.should.equal(true);
  });
  return it('should be detected as not possible', function() {
    var hand = new StraightFlush(['Qd', '7s', '8s', 'Js', 'Kh', 'Ts', '9d'], gameForTest);
    return hand.isPossible.should.equal(false);
  });

  // TODO: compare
});
