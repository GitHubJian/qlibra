import axios from 'axios';

module.exports = params => {
    

    return axios
        .request()
        .then(res => {
            return res.data;
        })
        .catch(e => {
            console.log(e);
        });
};
