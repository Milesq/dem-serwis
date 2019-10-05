const { readdirSync } = require('fs');
const Ftp = require('promise-ftp');

const ftp = new Ftp();

/* global process */
const host = process.env.HOST,
    user = process.env.USER,
    password = process.env.PASS;

ftp.connect({ host, user, password }).then(async () => {
    await destroy('/');

    const all = readdirSync('dist').map(async name => ftp.put('dist/' + name, name));

    await Promise.all(all);

    return ftp.end();
});

async function destroy(el) {
    const item = await ftp.list(el);

    const all = item.map(async ({ name, type }) => {
        if (type == '-') {
            ftp.delete(el + name);
            return el + name;
        } else {
            await destroy(el + name + '/');
            await ftp.rmdir(el + name);
            return el + name + '/';
        }
    });

    await Promise.all(all);
}
