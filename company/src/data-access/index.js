const { Client} =require('pg')
const config = require('../config');
const exceptions = require('../exceptions');

const createDbConnection = require('./database-connection');
const connection = createDbConnection({
    Client,
    config
})


const makeCompanyMethods = require('./companies.db');
const companyDb = makeCompanyMethods({
    connection,
    DatabaseError:exceptions.DatabaseError
});

module.exports = { companyDb }