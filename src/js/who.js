import Lightbox from './Lightbox';

const images = [
    require('../img/persons/1.Roma_Gorczyca.jpg'),
    require('../img/persons/2.Michal_Wilczak.jpg'),
    require('../img/persons/3.Jacek_Garlicki.jpg'),
    require('../img/persons/4.Karol_Wozniak.jpg'),
    require('../img/persons/5.Mikolaj_Biernacki.jpg'),
    require('../img/persons/6.Tomek_Slocinski.jpg'),
    require('../img/persons/7.Milosz_Wisniewski.jpg')
];

/**
 * @param {Document} [document] - Somebody's name.
 */
export default document => {
    const lb = new Lightbox();

    document.querySelectorAll('.portraits__image').forEach(portrait => {
        portrait.addEventListener('click', () => {
            const { innerHTML: desc } = portrait.querySelector('.description');
            const { innerHTML: name } = portrait.querySelector('.name');

            lb.src = images[portrait.dataset.i - 1];
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
