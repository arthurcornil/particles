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
        /*particles.forEach((particle) => {
            if (particle === this) {
                return ;
            }
            const x_distance = this.x_pos - particle.x_pos;
            const y_distance = this.y_pos - particle.y_pos;
            const distance = Math.sqrt((x_distance * x_distance) + (y_distance * y_distance))
            if (distance <= particleSize)
            {
                console.log('collision');
                this.x_velocity = -this.x_velocity;
                particle.x_velocity = -particle.x_velocity;
                this.y_velocity = -this.y_velocity;
                particle.y_velocity = -particle.y_velocity;
            }
        });*/
    }

    #drawBounds()
    {
        const observableRadius = 100;
        particles.forEach((particle) => {
            if (particle === this)
                return ;
            const x_distance = this.x_pos - particle.x_pos;
            const y_distance = this.y_pos - particle.y_pos;
            const distance = Math.sqrt((x_distance * x_distance) + (y_distance * y_distance))
            if (distance <= observableRadius) {
                const opacity = (observableRadius - distance) / observableRadius;
                c.strokeStyle = `rgb(255, 255, 255, ${opacity})`;
                c.lineWidth = 5;

                c.beginPath();
                c.moveTo(this.x_pos, this.y_pos);
                c.lineTo(particle.x_pos, particle.y_pos);
                c.stroke();
            }
        });
    }

    animate() {
        this.#draw(this.x_pos, this.y_pos);
        this.x_pos += this.x_velocity;
        this.y_pos += this.y_velocity;
        this.#checkCollision();
        this.#drawBounds();
    }
}

let particles = [];

for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

function animate()
{
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.animate());
    requestAnimationFrame(animate);
}

animate();
