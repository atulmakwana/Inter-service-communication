const employeeService = require('./employee-services');
const roleService = require('./role-services');

const Services = Object.freeze({
    employeeService,roleService
});

module.exports = Services;