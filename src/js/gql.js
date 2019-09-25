import compress from 'gql-compress';

function gql(url) {
    return async (query, ...args) => {
        args = args.map(el => (typeof el == 'string' ? `"${el}"` : el));
        query = query.map((part, i) => part + (args[i] || '')).join('');
        query = compress(query);

        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ query })
        }).then(x => x.json());
    };
}

export default gql;
