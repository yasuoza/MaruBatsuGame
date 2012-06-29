var Controller = require('../controller.js'),
    _Controller = {};

describe('Controller', function() {
  before(function(done) {
    _Controller.boad = [];
    for (var _i = 0; _i < 3; _i++) {
      for (var _j = 0; _j < 3; _j++) {
        if (!(_Controller.boad[_i] instanceof Array)) {
          _Controller.boad[_i] = [];
        }
        _Controller.boad[_i][_j] = -1;
      }
    }
    done();
  });


  describe('boad', function() {
    it('should initialized by -1', function(done) {
      Controller.boad.should.eql([[-1, -1, -1],
                                  [-1, -1, -1],
                                  [-1, -1, -1]]);
      done();
    });
  });

  describe('player', function() {
    it('should initialized by [0, 1]', function(done) {
      Controller.player[0].should.equal(0);
      Controller.player[1].should.equal(1);
      done();
    });
  });

  describe('#cellExistsAt', function() {
    it('should return true if cell exists', function(done) {
      var exist = false;
      for (var x = 0; x < 2; x++) {
        for (var y = 0; y < 2; y++) {
          exist = Controller.cellExistsAt(x, y);
          exist.should.ok;
        }
      }
      done();
    });

    it('should return false if cell does not exist', function(done) {
      var exist = true;
      exist = Controller.cellExistsAt(-1, 0);
      exist.should.not.ok;

      exist = true;
      exist = Controller.cellExistsAt(-1, -1);
      exist.should.not.ok;

      exist = true;
      exist = Controller.cellExistsAt(1, -1);
      exist.should.not.ok;

      exist = true;
      exist = Controller.cellExistsAt(2, -1);
      exist.should.not.ok;

      exist = true;
      exist = Controller.cellExistsAt(3, -1);
      exist.should.not.ok;

      exist = true;
      exist = Controller.cellExistsAt(3, 1);
      exist.should.not.ok;

      done();
    });
  });

  describe('#oppositeShoreList', function() {
    it('should return cell\'s opposite cell list', function(done) {
      var opposite_Center = Controller.oppositeShoreList(1, 1);
      opposite_Center.should.eql([[0, 0], [1, 0], [2, 0],
                                  [0, 1],         [2, 1],
                                  [0, 2], [1, 1], [2, 2]]);

      var opposite_CM = Controller.oppositeShoreList(0, 0);
      opposite_CM.should.eql([[0, 2], [2, 0], [2, 2]]);

      var opposite_LT = Controller.oppositeShoreList(1, 0);
      opposite_LT.should.eql([[1, 2]]);

      var opposite_RT = Controller.oppositeShoreList(2, 0);
      opposite_RT.should.eql([[0, 0], [0, 2], [2, 2]]);

      done();
    });
  });


  describe('#markBoadAt', function() {
    it('should marked by player', function(done) {
      var res = Controller.markBoadAt(0, 0);
      res.should.ok;
      Controller.boad.should.eql([[0, -1, -1],
                                  [-1, -1, -1],
                                  [-1, -1, -1]]);

      res = Controller.markBoadAt(0, 1);
      res.should.ok;
      Controller.boad.should.eql([[0, 1, -1],
                                  [-1, -1, -1],
                                  [-1, -1, -1]]);

      res = Controller.markBoadAt(0, 1);
      res.should.not.ok;
      Controller.boad.should.eql([[0, 1, -1],
                                  [-1, -1, -1],
                                  [-1, -1, -1]]);

      res = Controller.markBoadAt(1, 1);
      res.should.ok;
      Controller.boad.should.eql([[0, 1, -1],
                                  [-1, 0, -1],
                                  [-1, -1, -1]]);

      res = Controller.markBoadAt(0, 2);
      res.should.ok;
      Controller.boad.should.eql([[0, 1, 1],
                                  [-1, 0, -1],
                                  [-1, -1, -1]]);
      done();
    });
  });

  describe('#checkClear', function() {
    it('should return true if line is made', function(done) {
      Controller.boad = _Controller.boad;

      Controller.boad = [[-1, -1, -1],
                         [-1, -1, -1],
                         [-1, -1, -1]];
      var res = Controller.checkClear();
      res.should.not.ok;
      res = false;

      Controller.boad = [[1, -1, -1],
                         [-1, -1, -1],
                         [-1, -1, -1]];
      res = Controller.checkClear();
      res.should.not.ok;

      Controller.boad = [[1, -1, -1],
                         [-1, 1, -1],
                         [-1, -1, 1]];
      res = Controller.checkClear();
      res.should.ok;
      res = false;

      Controller.boad = [[-1, -1, 1],
                         [-1, 1, -1],
                         [1, 0, -1]];
      res = Controller.checkClear();
      res.should.ok;

      Controller.boad = [[1, 1, 1],
                         [-1, 0, -1],
                         [1, 0, 1]];
      res = Controller.checkClear();
      res.should.ok;
      res = false;

      Controller.boad = [[1, -1, 1],
                         [1, 0, -1],
                         [1, 0, 1]];
      res = Controller.checkClear();
      res.should.ok;
      res = false;

      Controller.boad = [[-1, -1, 1],
                         [-1, 0, 1],
                         [-1, 0, 1]];
      res = Controller.checkClear();
      res.should.ok;
      res = false;

      Controller.boad = [[-1, -1, -1],
                         [-1, -1, -1],
                         [1, 1, 1]];
      res = Controller.checkClear();
      res.should.ok;

      done();
    });
  });

  describe('isCleared', function() {
    it('should be true when someone player made line', function(done) {
      Controller.boad = _Controller.boad;
      Controller.markBoadAt(0, 0);
      Controller.isCleared.should.not.ok;

      Controller.markBoadAt(0, 1); Controller.isCleared.should.not.ok;
      Controller.markBoadAt(1, 1); Controller.isCleared.should.not.ok;
      Controller.markBoadAt(0, 2); Controller.isCleared.should.not.ok;
      Controller.markBoadAt(2, 2);
      Controller.isCleared.should.ok;

      done();
    });
  });
});
