import { routes } from '../config';

function Indicator(canvas = required()) {
    this.canvas = canvas;

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = '#0095ff';
    this.lastPos = null;

    this.move = async path => {
        const canvas = this.canvas;
        const key = routes.findIndex(
            ({ name }) =>
                name ===
                path
                    .split('.')
                    .slice(0, -1)
                    .join('.')
        );

        await this.setTo(key * (canvas.width / 3));
        this.ctx.fillRect(key * (canvas.width / 3), 0, canvas.width / 3, canvas.height);
        this.ctx.fill();
    };

    this.setTo = (to, len = canvas.width / 3) => {
        const acceleration = 0.25;
        const reverseAcceleration = 0.4;

        return new Promise(resolve => {
            let speed = 0;
            let wasLessThen5 = false;
            let wasLessThen30 = false;

            const ctx = this.ctx;

            async function update() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (this.lastPos === null) {
                    ctx.fillRect(to, 0, len, canvas.height);
                    ctx.fill();

                    this.lastPos = to;
                    return;
                }

                const direction = this.lastPos < to ? 1 : -1;

                // when distance from indicator to target is less than ...
                if (Math.abs(this.lastPos - to) < 10 && !wasLessThen5) {
                    wasLessThen5 = true;
                    this.lastPos = Math.round(this.lastPos);
                    speed = direction;
                } else if (Math.abs(this.lastPos - to) < 45 && !wasLessThen30) {
                    wasLessThen30 = true;
                    speed -= reverseAcceleration * direction;
                } else if (Math.abs(this.lastPos - to) < 5) {
                    this.lastPos = to;
                } else {
                    speed += acceleration * direction;
                }

                if (Math.round(to) === Math.round(this.lastPos)) {
                    this.lastPos = to;
                    resolve();
                    return;
                }

                this.lastPos += speed;

                ctx.fillRect(this.lastPos, 0, len, canvas.height);
                ctx.fill();

                setTimeout(() => window.requestAnimationFrame(update.bind(this)), 3);
            }

            window.requestAnimationFrame(update.bind(this));
        });
    };
}

export default Indicator;

function required() {
    throw 'Parameter is required but not passed!';
}
