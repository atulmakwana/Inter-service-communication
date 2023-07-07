const employeeActions = require('./employee');
const roleAction = require('./roles');


const controllers = Object.freeze({
    employeeActions,
    roleAction,
});

module.exports = controllers;