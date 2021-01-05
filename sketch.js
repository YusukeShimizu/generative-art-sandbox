let mic;
let volHistory = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    userStartAudio();

    angleMode(DEGREES); // Change the mode to DEGREES

    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    translate(width / 2, height / 2)
    background(0);
    fill(255);
    micLevel = mic.getLevel();

    var sd = micLevel * 100;
    circle(0, 0, sd)

    // see https://medium.com/@nishancw/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
    noFill();
    beginShape();
    volHistory.push(micLevel);
    for (let i = 0; i < 360; i++) {
        stroke(255);
        let r = map(volHistory[i], 0, 1, 10, 300);
        let x = r * cos(i);
        let y = r * sin(i);
        vertex(x, y);
    }
    endShape();

    if (volHistory.length > 360) {
        volHistory.splice(0, 1);
    }

}