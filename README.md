
# JS Learning Boilerplate

Little funny (my kid has approved) boilerplate for js tutoring project

## How to Start the App in VS Code

1. **Open the Project**: Open Visual Studio Code and navigate to the project directory `/path/to/js-learning/`.
2. **Install Dependencies**: Open a terminal in VS Code and run `npm install` to install the necessary dependencies.
3. **Run the App**: After the dependencies are installed, run `npm start` to start the application.

## Recommended VS Code Plugins

To enhance your development experience, consider installing the following VS Code plugins:
- **ESLint**: Provides JavaScript linting.
- **Prettier - Code formatter**: Ensures consistent code formatting.
- **Debugger for Chrome**: Debug your JavaScript code in the Google Chrome browser.
- **JavaScript (ES6) code snippets**: Adds useful JavaScript snippets.

These plugins will help you write clean, consistent, and error-free code.

## Differece beetween p5.js on khan academy and p5.js on local machine with modules

The main difference between p5.js on Khan Academy and p5.js on your local machine is the use of modules. On Khan Academy, you can use the p5.js library without modules, which means you can access all the p5.js functions and features without any additional setup.



## Prerequisites

Before you start, make sure you have the following installed on your machine:
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **npm**: Comes with Node.js, but make sure it's up to date by running `npm install -g npm`.
- **Visual Studio Code**: Download and install from [code.visualstudio.com](https://code.visualstudio.com/).

## Don't Panic

Starting a new project can be overwhelming, but don't panic! Here are a few tips to help you stay calm and focused:
- **Take Breaks**: Regular breaks can help you stay productive and avoid burnout.
- **Ask for Help**: If you get stuck, don't hesitate to ask for help.
- **Stay Organized**: Keep your project files and folders organized to make it easier to find what you need.
- **Practice**: The more you practice, the more comfortable you'll become with the code and tools.

## If you are a tutor

If you are a tutor, you can use this boilerplate to create a fun and engaging learning experience for your students. Feel free to customize the project to suit your teaching style and the needs of your students.

## Breakdown of main.js

The `main.js` file is the entry point of our application. Here's a breakdown of its key parts:

1. **Import Statements**
    ```javascript
    import p5 from "p5";
    ```
    - This imports the p5.js library, which is used for creating graphics and interactive content.

2. **Global Variables**
    ```javascript
    let fill, circle, background, mouseX = 0, mouseY = 0, t = 0;
    let crazy_scream = new Audio("assets/sound/crazy_scream.mp3");
    let frogColor = { R: 0, G: 255, B: 0 };
    ```
    - These variables are used throughout the sketch. `fill`, `circle`, and `background` are p5.js functions. `mouseX` and `mouseY` track the mouse position. `t` is a time variable. `crazy_scream` is an audio object. `frogColor` stores the color of the frog.

3. **Event Listener**
    ```javascript
    document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    ```
    - This updates `mouseX` and `mouseY` with the current mouse position whenever the mouse is moved.

4. **Sketch Function**
    ```javascript
    const sketch = (p) => {
      fill = p.fill;
      circle = p.circle;
      background = p.background;
    ```
    - This function defines the p5.js sketch. It initializes the `fill`, `circle`, and `background` functions from p5.js.

5. **Preload Function**
    ```javascript
      p.preload = function () {
        document.body.appendChild(crazy_scream);
      };
    ```
    - This function is called before `setup` and is used to load assets. Here, it appends the `crazy_scream` audio element to the document body.

6. **Setup Function**
    ```javascript
      p.setup = function () {
        p.createCanvas(600, 600);
        p.frameRate(30);
        t = 0;
      };
    ```
    - This function sets up the canvas size, frame rate, and initializes the time variable `t`.

7. **Mouse Pressed Function**
    ```javascript
      p.mousePressed = function () {
        crazy_scream.play();
        frogColor = {
          R: Math.random() * 255,
          G: Math.random() * 255,
          B: Math.random() * 255,
        };
      };
    ```
    - This function plays the `crazy_scream` sound and changes the frog's color to a random color when the mouse is pressed.

8. **Mouse Released Function**
    ```javascript
      p.mouseReleased = function () {
        p.mousePressed();
        crazy_scream.load();
      };
    ```
    - This function replays the `mousePressed` function and reloads the `crazy_scream` sound when the mouse is released.

9. **Draw Function**
    ```javascript
      p.draw = function () {
        t = t + 0.05;
        var scale = Math.sin(t) / 2;
        p.background(220);
        drawfrog(mouseX, mouseY, 1 + scale, p.mouseIsPressed);
        drawfrog(mouseX - 200, mouseY, 1 - scale, p.mouseIsPressed);
        drawfrog(mouseX + 200, mouseY, 1 - scale, p.mouseIsPressed);
      };
    ```
    - This function is called repeatedly to draw the frame. It updates the time variable `t`, calculates a scale factor, clears the background, and draws three frogs at different positions.

10. **Draw Frog Function**
    ```javascript
      const drawfrog = function (x, y, scale, mouthOpened) {
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
    ```
    - This function draws a frog at the specified position and scale. If `mouthOpened` is true, it draws an open mouth.

11. **Get Frog Function**
    ```javascript
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
    ```
    - This function calculates the positions and sizes of the frog's face and eyes based on the given position and scale.

12. **Initialize Sketch**
    ```javascript
    new p5(sketch);
    ```
    - This initializes the p5.js sketch by passing the `sketch` function to the p5 constructor.

## License

This project is licensed under the MIT License - [MIT License](https://opensource.org/licenses/MIT).

Happy coding!.