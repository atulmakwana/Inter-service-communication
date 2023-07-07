const axios = require('axios');
const config = require('../../config');
const exceptions = require('../../exceptions');

const makegetCompanyByName = require('./get-company-by-name');
const getCopmanybyName = makegetCompanyByName({
    config,
    axios,
    ObjectNotFoundError:exceptions.ObjectNotFoundError
});

const makegetCompanybyId = require('./get-company-by-id');
const getCopmanybyId = makegetCompanybyId({
    config,
    axios
});

const makegetAllCompany= require('./get-all-company');
const getAllCopmany = makegetAllCompany({
    config,
    axios
});

module.exports = Object.freeze({
    getCopmanybyName,
    getCopmanybyId,
    getAllCopmany
})