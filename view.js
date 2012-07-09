(function() {
  // Modify me later
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      width = 320;
      height = 416;

  var config = {
    width: 30,
    height: 30
  };

  var initCanvas = function initCanvas(canvas) {
    canvas.height = height;
    canvas.width = width;
    setTimeout(function() { scrollTo(0,  0); },  100);

    var line_start = 0;
    ctx.lineWidth = 3;
    for (var line = 1; line <= 2; line++) {
      // Vertical
      line_start = line * width / 3;
      ctx.beginPath();
      ctx.moveTo(line_start, 0);
      ctx.lineTo(line_start, height);
      ctx.stroke();

      // Horizontal
      line_start = line * height / 3;
      ctx.beginPath();
      ctx.moveTo(0, line_start);
      ctx.lineTo(width, line_start);
      ctx.stroke();
    }
  };

  var makeEventListener = function makeEventListener(canvas) {
    canvas.onmousedown = function(e) {
      onTouch(e.clientX, e.clientY);
    }
    canvas.ontouchstart = function(e) {
      if (e.touches[0]) {
        onTouch(e.touches[0].clientX, e.touches[0].clientY);
      }
      e.preventDefault();
    };
  };

  var onTouch = function onTouch(touch_x, touch_y) {
      var x_base = width / 3, y_base = height / 3;
      var x = Math.floor((touch_x - canvas.offsetLeft) / x_base);
      var y = Math.floor((touch_y - canvas.offsetTop) / y_base);
      Controller.markBoadAt(y, x);
      renderMark(x, y);

      if (Controller.isCleared === true) {
        alert('Player ' + Controller.player[1 - Controller.turn] + ' won!');
      }
  };

  var renderMark = function renderMark(cell_x, cell_y) {
    var center_x = cell_x * width / 3 + 50,
        center_y = cell_y * height / 3 + 50;
    if (Controller.turn) {
      ctx.beginPath();
      ctx.moveTo(center_x - 25, center_y);
      ctx.lineTo(center_x + config.width, center_y + config.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(center_x + 25 - config.width, center_y + config.height);
      ctx.lineTo(center_x + 25, center_y);
      ctx.stroke();
    }
    else {
      ctx.beginPath();
      ctx.arc(center_x, center_y, config.width / 2, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }

  initCanvas(canvas);
  makeEventListener(canvas);
}());
