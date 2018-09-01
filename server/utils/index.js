module.exports = {
    deepClone: val => {
        return JSON.parse(JSON.stringify(val));
    }
};
