import Lightbox from './Lightbox';

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
