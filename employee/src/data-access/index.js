const { Client} =require('pg')
const config = require('../config');
const exceptions = require('../exceptions')

const createConnection = require('./database-connection');
const connection = createConnection({
    Client,
    config
});


const makeEmployeeMethods = require('./employees.db');
const employeeDb = makeEmployeeMethods({
    DatabaseError:exceptions.DatabaseError,
    connection
});

const makeSessionMethods = require('./sessionLogs.db');
const sessionDb = makeSessionMethods({
    DatabaseError:exceptions.DatabaseError,
    connection
});

const makeRoleMethods = require('./roles.db');
const roleDb = makeRoleMethods({
    DatabaseError:exceptions.DatabaseError,
    connection,
})

module.exports = { roleDb,employeeDb,sessionDb }