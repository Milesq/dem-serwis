import anime from 'animejs/lib/anime.es.js';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

function Lightbox() {
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('curtain__content-wrapper');
    contentWrapper.style.display = 'none';

    const content = document.createElement('div');
    content.classList.add('curtain__content');

    const cross = document.createElement('div');
    cross.classList.add('cross');
    cross.addEventListener('click', () => this.hide());

    contentWrapper.appendChild(content);
    contentWrapper.appendChild(cross);
    curtain.appendChild(contentWrapper);
    document.body.appendChild(curtain);

    anime
        .timeline({
            targets: '.curtain__content-wrapper'
        })
        .add({
            translateY: '100vh'
        });

    this.show = () => {
        disablePageScroll();
        contentWrapper.style.display = 'block';

        content.innerHTML = `
            <div style="background: url(${this.src})" class="curtain__image"></div>
            <div class="curtain__description">
                <h2>${this.title}</h2>
                <p>${this.desc}</p>
            </div>
        `;

        curtain.style.pointerEvents = 'auto';

        anime
            .timeline({
                easing: 'easeOutQuad'
            })
            .add({
                targets: '.curtain',
                backgroundColor: 'rgba(0, 0, 0, .6)',
                duration: 250,
                easing: 'linear'
            })
            .add(
                {
                    targets: '.curtain__content-wrapper',
                    translateY: 0
                },
                '-=200'
            );
    };

    this.hide = () => {
        enablePageScroll();

        anime
            .timeline({
                easing: 'easeOutQuad'
            })
            .add({
                targets: '.curtain',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 350,
                easing: 'linear'
            })
            .add(
                {
                    targets: '.curtain__content-wrapper',
                    translateY: '100vh',
                    complete() {
                        curtain.style.pointerEvents = 'none';
                        contentWrapper.style.display = 'none';
                    }
                },
                '-=300'
            );
    };
}

export default Lightbox;
