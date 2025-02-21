const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

class Star {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0 - this.radius;
            this.x = Math.random() * canvas.width;
        }
        this.opacity = Math.random() * 0.5 + 0.5;
    }
}

function init() {
    for (let i = 0; i < 150; i++) {
        let radius = Math.random() * 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = Math.random() * 1 + 0.2;
        stars.push(new Star(x, y, radius, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    init();
});

init();
animate();
