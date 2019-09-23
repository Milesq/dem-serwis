import { disablePageScroll, enablePageScroll } from 'scroll-lock';

function Lightbox() {
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    curtain.style.display = 'none';

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('curtain__content-wrapper');

    const content = document.createElement('div');
    content.classList.add('curtain__content');

    const cross = document.createElement('div');
    cross.classList.add('cross');
    cross.addEventListener('click', () => this.hide());

    contentWrapper.appendChild(content);
    contentWrapper.appendChild(cross);
    curtain.appendChild(contentWrapper);
    document.body.appendChild(curtain);

    this.show = () => {
        disablePageScroll();
        curtain.style.display = 'flex';

        content.innerHTML = `
            <div style="background: url(${this.src})" class="curtain__image"></div>
            <div class="curtain__description">
                <h2>${this.title}</h2>
                <p>${this.desc}</p>
            </div>
        `;
    };

    this.hide = () => {
        enablePageScroll();
        curtain.style.display = 'none';
    };
}

/**
 * @param {Document} [document] - Somebody's name.
 */

export default document => {
    const lb = new Lightbox();

    document.querySelectorAll('.portraits__image').forEach(portrait => {
        portrait.addEventListener('click', () => {
            const { innerHTML: desc } = portrait.querySelector('.description');
            const { innerHTML: name } = portrait.querySelector('.name');

            lb.src = portrait.dataset.img;
            lb.title = name;
            lb.desc = desc;
            lb.show();
        });
    });

    window.addEventListener('keydown', ({ key }) => {
        if (key == 'Escape') {
            document.querySelectorAll('.portraits__image').forEach(() => {
                lb.hide();
            });
        }
    });
};
