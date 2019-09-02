import { routes } from '../config';

const canvas = document.getElementById('indicator');
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#0095ff';

export default async path => {
    const key = routes.findIndex(
        ({ name }) =>
            name ===
            path
                .split('.')
                .slice(0, -1)
                .join('.')
    );

    await setTo(key * (canvas.width / 3));
    ctx.fillRect(key * (canvas.width / 3), 0, canvas.width / 3, canvas.height);
    ctx.fill();
};

let lastPos = null;

function setTo(to, len = canvas.width / 3) {
    const acceleration = 0.25;
    const reverseAcceleration = 0.4;

    return new Promise(resolve => {
        let speed = 0;
        let wasLessThen5 = false;
        let wasLessThen30 = false;

        async function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (lastPos === null) {
                ctx.fillRect(to, 0, len, canvas.height);
                ctx.fill();

                lastPos = to;
                return;
            }

            const direction = lastPos < to ? 1 : -1;
            console.log(lastPos, to, speed);

            // when distance from indicator to target is less than ...
            if (Math.abs(lastPos - to) < 10 && !wasLessThen5) {
                wasLessThen5 = true;
                lastPos = Math.round(lastPos);
                speed = direction;
            } else if (Math.abs(lastPos - to) < 45 && !wasLessThen30) {
                wasLessThen30 = true;
                speed -= reverseAcceleration * direction;
            } else if (Math.abs(lastPos - to) < 5) {
                lastPos = to;
            } else {
                speed += acceleration * direction;
            }

            if (Math.round(to) === Math.round(lastPos)) {
                lastPos = to;
                resolve();
                return;
            }

            lastPos += speed;

            ctx.fillRect(lastPos, 0, len, canvas.height);
            ctx.fill();

            setTimeout(() => window.requestAnimationFrame(update), 3);
        }

        window.requestAnimationFrame(update);
    });
}
