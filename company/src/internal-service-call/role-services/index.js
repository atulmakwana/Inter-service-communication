const axios = require('axios')
const config = require('../../config');

const makeDeleteRoleForCopmany = require('./delete-role-for-company');
const deleteRoleForCopmany = makeDeleteRoleForCopmany({
    axios,
    config
});

module.exports = Object.freeze({
    deleteRoleForCopmany
})