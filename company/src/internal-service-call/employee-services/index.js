const axios = require('axios')
const config = require('../../config');

const makedeleteAllEmployeesbyCopmany = require('./delete-all-employees');
const deleteAllEmployeesbyCopmany = makedeleteAllEmployeesbyCopmany({
    axios,
    config
});

module.exports = Object.freeze({
    deleteAllEmployeesbyCopmany
})