

class lerpLine {
    constructor(from, to) {
        this.from = from
        this.to = to
        this.process = 0
    }
    do() {
        this.process += 0.05
        if (this.process > 1) {
            return
        }
        stroke("white");
        line(
            this.from.x,
            this.from.y,
            lerp(this.from.x, this.to.x, this.process),
            lerp(this.from.y, this.to.y, this.process)
        )
    }
}

class sequencialProcessor {
    constructor() {
        this.tasks = []
    }
    addTask(task) {
        this.tasks.push(task)
    }
    process() {
        if (this.tasks[0].process >= 1) {
            this.tasks.shift()
        }
        this.tasks[0].do()
    }
    initialize() {
        this.tasks.forEach(task => {
            task.process = 0
        });
    }

}

let processor = new sequencialProcessor()

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("black");
    let pointOfCenter = createVector(0, 0);
    let gons = 6
    for (let i = 0; i < gons; i += 1) {
        prev = createVector(pointOfCenter.x, pointOfCenter.y - 100).rotate(TWO_PI / gons * i)
        next = createVector(pointOfCenter.x, pointOfCenter.y - 100).rotate(TWO_PI / gons * (i + 1))
        processor.addTask(new lerpLine(prev, next))
    }
}

function draw() {
    translate(width / 2, height / 2)
    processor.process()

    if (frameCount > 400) {
        processor.initialize()
        frameCount = 0
        clear()
        background("black");
    }
}