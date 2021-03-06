import Swal from 'sweetalert2';
import gqlBuilder from './gql';

import { API } from '../config';

/**
 * @param {Document} [doc] - Somebody's name.
 */

export default async doc => {
    const gql = gqlBuilder(API);
    const input = doc.getElementById('order-id');
    const submitBtn = doc.getElementById('submit');

    async function submit() {
        const {
            data: { order }
        } = await gql`
            query {
                order(where: {id: ${input.value}}) {
                    name
                    description
                    done
                }
            }
        `;

        if (order === null) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Incorrect ID!',
                confirmButtonColor: '#f24747'
            });
        } else {
            const config = {
                type: 'info',
                title: order.name,
                text: order.description,
                footer: 'Chcesz żebyśmy cię powiadomili kiedy twój sprzęt będzie gotowy?'
            };

            if (order.done) {
                config.type = 'success';
                config.title = 'Urządzenie gotowe do odebrania';
                config.confirmButtonColor = '#47f247';
                config.text = '';
                config.footer = undefined;
            }

            Swal.fire(config);

            // if (!order.done && (await Notification.requestPermission()) == 'granted') {
            //     navigator.serviceWorker.register('worker.js');
            // }
        }
    }

    input.addEventListener('keydown', ({ code }) => {
        if (code == 'Enter') {
            submit();
        }
    });

    submitBtn.addEventListener('click', submit);
};
