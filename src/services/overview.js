import request from './../utils/request-extra.js';

export function getItem(params) {
    const url = '';
    return request({
        url,
        ...params
    }).then(data => {
        return data;
    });
}
