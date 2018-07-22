var mousePoint = view.center;
var amount = 25;
var colors1 = ['black', 'blue', 'orange', 'red'];
var colors2 = ['black', 'white', 'black', 'white'];
var colors = colors1;
var x = 1;
var clicks = 1;
var trail = [];
var children = [];
var sticky = false;
var rects = false;
// making x large and clicks small makes long rectangles that twirl around each other
//  that create circles when you leave it sticky
// keep x = 1 and clicks = 1 for small circles

function build() {
  for (var i = 0; i < amount; i++) {
    var rect = new Rectangle([0, 0], [x, clicks]);
    rect.center = mousePoint;
    var path = new Path.Rectangle(rect, 6); // make circle by adding rounded second arg
    path.fillColor = colors[i % 4];
    var scale = (1 - i / amount) * 20;
    path.scale(scale);
    trail.push(path);
  }
}

function tearDown() {
  for (var i = 0; i < amount; i++) {
    trail[i].remove();
  }
  for (var i = 0; i < children.length; i++) {
    children[i].remove();
  }
}

function onMouseMove(event) {
  mousePoint = event.point;
}

function onMouseDown(event) {
  sticky = !sticky;
}

function onKeyDown(event) {
  switch (event.key) {
    case "=":
      clicks += 1;
      break;
    case "c":
      if (colors == colors1) {
        colors = colors2;
      } else {
        colors = colors1;
      }
      break;
    case "-":
      clicks = clicks - 1;
      break;
    case "r":
      rects = !rects;
      break;
    case "q":
      tearDown();
      build();
      break;
    case "s":
      window.location.replace(window.location.href + "settings");
      break;
    default:
      break;
  }
}

function onFrame(event) {
  for (var i = 0, l = trail.length; i < l; i++) {
    var item = trail[i];
    var delta = (mousePoint - item.position) / (i + 5);
    item.rotate(Math.sin((event.count + i) / 10) * 7);
    item.position += delta;
    item.fillColor = colors[i % 4];
    item.scale = clicks;
    if (sticky) {
      var clone = item.clone();
      clone.scale(clicks);
      clone.fillColor = colors[i % 4];
      children.push(clone);
    }
  }
}

build();
