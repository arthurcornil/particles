const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const particleSize = 10;

class Particle {
    x_pos;
    y_pos;
    x_velocity;
    y_velocity;

    constructor() {
        this.x_velocity = Math.random() * 3;
        this.y_velocity = Math.random() * 3;
        this.x_pos = Math.floor(Math.random() * canvas.width - particleSize);
        this.y_pos = Math.floor(Math.random() * canvas.height - particleSize);
    }

    #draw(x, y) {
        c.beginPath();
        c.arc(x, y, particleSize, 0, 2 * Math.PI);
        c.fillStyle = "#ffffff";
        c.fill();
    }

    #checkCollision() {
        if (this.x_pos >= canvas.width - particleSize || this.x_pos <= particleSize) {
            this.x_velocity = -this.x_velocity
        }
        if (this.y_pos >= canvas.height - particleSize || this.y_pos <= particleSize) {
            this.y_velocity = -this.y_velocity
        }
        particles.forEach((particle) => {
            if (particle === this) {
                return ;
            }
            if (particle.x_pos >= this.x_pos - particleSize && particle.x_pos <= this.x_pos + particleSize
                && particle.y_pos >= this.y_pos - particleSize && particle.y_pos <= this.y_pos + particleSize)
            {
                console.log('collision');
                this.x_velocity = -this.x_velocity;
                particle.x_velocity = -particle.x_velocity;
                this.y_velocity = -this.y_velocity;
                particle.y_velocity = -particle.y_velocity;
            }
        });
    }

    animate() {
        this.#draw(this.x_pos, this.y_pos);
        this.x_pos += this.x_velocity;
        this.y_pos += this.y_velocity;
        this.#checkCollision();
    }
}

let particles = [];

for (let i = 0; i < 100;  i++) {
    particles.push(new Particle());
}

function animate()
{
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.animate());
    requestAnimationFrame(animate);
}

animate();
