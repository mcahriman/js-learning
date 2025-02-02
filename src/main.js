import p5 from "p5";

let fill,
  circle,
  background,
  mouseX = 0,
  mouseY = 0,
  t = 0,
  crazy_scream = new Audio("assets/sound/crazy_scream.mp3"),
  frogColor = { R: 0, G: 255, B: 0 };

document.addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

/**
 * @param {p5} p
 */
const sketch =  (p) => {
  fill = p.fill;
  circle = p.circle;
  background = p.background;

  p.preload = function () {
    document.body.appendChild(crazy_scream);
  };

  p.setup = function () {
    p.createCanvas(600, 600);
    p.frameRate(30);
    t = 0;
  };

  p.mousePressed = function () {
    crazy_scream.play();
    frogColor = {
      R: Math.random() * 255,
      G: Math.random() * 255,
      B: Math.random() * 255,
    };
  };

  p.mouseReleased = function () {
    p.mousePressed();
    crazy_scream.load();
  };

  p.draw = function () {
    t = t + 0.05;
    var scale = Math.sin(t) / 2;
    p.background(220);
    drawfrog(mouseX, mouseY, 1 + scale, p.mouseIsPressed);
    drawfrog(mouseX - 200, mouseY, 1 - scale, p.mouseIsPressed);
    drawfrog(mouseX + 200, mouseY, 1 - scale, p.mouseIsPressed);
  };

  const drawfrog = function (x, y, scale, mouthOpened) {
    // Druw frog
    const frogy = getfrog(x, y, scale);
    p.fill(frogColor.R, frogColor.G, frogColor.B);
    p.circle(frogy.face.x, frogy.face.y, frogy.face.size);
    p.fill(255, 255, 255);
    p.circle(frogy.lefteye.x, frogy.lefteye.y, frogy.eyeRadius);
    p.circle(frogy.rightEye.x, frogy.rightEye.y, frogy.eyeRadius);
    if (mouthOpened) {
      p.circle(
        frogy.face.x + 5 * (2.5 - Math.random() * 5),
        frogy.face.y + 20 * scale,
        frogy.face.size * 0.5
      );
    }
    p.fill(0, 0, 0);
    p.circle(frogy.lefteye.x, frogy.lefteye.y, frogy.eyeRadius / 3);
    p.circle(frogy.rightEye.x, frogy.rightEye.y, frogy.eyeRadius / 3);
  };

  const getfrog = function (x, y, scale) {
    const faceRadius = 100;
    const eyeRadius = 20;
    var frogyObj = {
      eyeRadius: eyeRadius * scale,
      face: {
        x: x,
        y: y,
        size: faceRadius * scale,
      },
      lefteye: {
        x: x - (faceRadius * (1 / 3) + Math.random() * 10) * scale,
        y: y - faceRadius * (1 / 3) * scale,
      },
      rightEye: {
        x: x + faceRadius * (1 / 3) * scale,
        y: y - faceRadius * (1 / 3) * scale,
      },
    };
    return frogyObj;
  };
}


new p5(sketch);
