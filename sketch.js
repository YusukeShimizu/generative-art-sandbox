let mic;
let volHistory = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    userStartAudio();

    mic = new p5.AudioIn();
    mic.start();
}

function draw() {

    background(0);
    fill(255);
    micLevel = mic.getLevel();

    // see https://medium.com/@nishancw/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
    noFill();
    beginShape();
    volHistory.push(micLevel * 3);
    for (let i = 0; i < 360; i++) {
        stroke(255);
        let r = map(volHistory[i], 0, 1, 10, 300);
        let x = r * cos(i);
        let y = r * sin(i);
        vertex(x + windowWidth / 2, y + windowHeight / 2);
    }
    endShape();

    if (volHistory.length > 360) {
        volHistory.splice(0, 1);
    }

    for (i = 0; i < micLevel * 3000; i++) {
        var x = new Array(4);
        for (j = 0; j < 4; j++) {
            x[j] = random();
        }
        stroke(color(x[0] * 255, x[1] * 255, x[2] * 255, 30));
        bezier(windowWidth / 2, windowHeight / 2, x[0] * windowWidth, x[1] * windowHeight, x[2] * windowWidth, x[3] * windowHeight, windowWidth / 2, windowHeight / 2);
    }

}