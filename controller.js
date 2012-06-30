var Controller = {
  boad: [],

  player: [0, 1],

  turn: 0,

  cellExistsAt: function(x, y) {
    if (x < 0 || 2 < x || y < 0 || 2 < y) {
      return false;
    }
    return true;
  },

  oppositeShoreList: function(cell_x, cell_y) {
    if (cell_x === 1 && cell_y === 1) {
      return [[0, 0], [1, 0], [2, 0],
              [0, 1],         [2, 1],
              [0, 2], [1, 1], [2, 2]];
    }
    var list = [];
    var opposite_x, opposite_y;
    for (var _x = -1; _x <= 1; _x++) {
      for (var _y = -1; _y <= 1; _y++) {
        if (_x === 0 && _y === 0) continue;
        opposite_x = cell_x + _x * 2;
        opposite_y = cell_y + _y * 2;
        if (this.cellExistsAt(opposite_x, opposite_y) === true) {
          list.push([opposite_x, opposite_y]);
        }
      }
    }

    return list;
  },

  markBoadAt: function(cell_x, cell_y) {
    if (this.cellExistsAt(cell_x, cell_y) === false) {
      return false;
    }
    if (this.boad[cell_x][cell_y] !== -1) {
      return false;
    }

    this.boad[cell_x][cell_y] = this.player[this.turn];
    this.turn = 1 - this.turn;
    this.isCleared = this.checkClear();
    return true;
  },

  checkClear: function() {
    var origin = -1,
    _x,
    _y;
    for (var origin_y = 0; origin_y <= 4; origin_y++) {
      _x = origin_y < 3 ? 0 : origin_y === 3 ? 1 : 2;
      _y = origin_y === 4 ? 0 : origin_y % 3;
      origin = this.boad[_x][_y];
      if (origin < 0) continue;

      var oppositeList = this.oppositeShoreList(_x, _y);
      var oppositeListLength = oppositeList.length;

      for (var i = 0; i < oppositeListLength; i++) {
        var point = oppositeList[i],
          opposite_x = point[0],
                     opposite_y = point[1];
        if (origin === this.boad[opposite_x][opposite_y]) {
          var tmp_x, tmp_y;
          var middle_x = (tmp_x = Math.abs(opposite_x - _x)) > 0 ?
                                                   tmp_x - 1 : _x;
          var middle_y = (tmp_y = Math.abs(opposite_y - _y)) > 0 ?
                                                   tmp_y - 1 : _y;
          if (origin === this.boad[middle_x][middle_y]) {
            return true;
          }
        }
      }
    }
    return false;
  },

  isCleared: false
};

for (var _i = 0; _i < 3; _i++) {
  for (var _j = 0; _j < 3; _j++) {
    if (!(Controller.boad[_i] instanceof Array)) {
      Controller.boad[_i] = [];
    }
    Controller.boad[_i][_j] = -1;
  }
}

module.exports = Controller;
