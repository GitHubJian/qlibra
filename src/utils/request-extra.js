import axios from 'axios';

module.exports = ({ url, method, params, query, body, isStorage }) => {
    const storage = localStorage.getItem(url);
    if (storage) {
        return Promise.resolve(storage);
    }

    return axios
        .request({
            url,
            method,
            params,
            query,
            body
        })
        .then(({ data }) => {
            if (isStorage) {
                localStorage.setItem(url, res.data);
            }

            return data;
        })
        .catch(e => {
            console.log(e);
        });
};
