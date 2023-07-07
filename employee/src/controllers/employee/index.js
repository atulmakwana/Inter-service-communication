const Joi = require('joi');
const { employee } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makecreateEmployeeAction = require('./create-employee');
const createEmployeeAction = makecreateEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    createEmployee:employee.createEmployee
});

const makedeleteEmployeeAction = require('./delete-employee');
const deleteEmployeeAction = makedeleteEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    deleteEmployee:employee.deleteEmployee
})

const makedeleteEmployeeForCompanyAction = require('./delete-employee-for-company');
const deleteEmployeeForCompanyAction = makedeleteEmployeeForCompanyAction({
    InternalServerError:exceptions.InternalServerError,
    deleteEmployeeForCompany:employee.deleteEmployeeForCompany
})

const makegetAllEmployeeAction = require('./get-all-employee');
const getAllEmployeeAction = makegetAllEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    getAllEmployee:employee.getAllEmployee
})

const makegetEmployeeAction = require('./get-employee');
const getEmployeeAction = makegetEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    getEmployee:employee.getEmployee
})

const makegetEmployeeForCompanyAction = require('./get-employee-for-company');
const getEmployeeForCompanyAction = makegetEmployeeForCompanyAction({
    InternalServerError:exceptions.InternalServerError,
    getEmployeeForCompany:employee.getEmployeeForCompany
})

const makeupdateEmployeeAction = require('./update-employee');
const updateEmployeeAction =makeupdateEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    updateEmployee:employee.updateEmployee
});

const makeverifyEmployeeAction = require('./verify-employee');
const verifyEmployeeAction =makeverifyEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    verifyEmployee:employee.verifyEmployee
});

const makeloginEmployeeAction = require('./login-employee');
const loginEmployeeAction =makeloginEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    loginEmployee:employee.loginEmployee
});

const makelogoutEmployeeAction = require('./logout-employee');
const logoutEmployeeAction =makelogoutEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    logoutEmployee:employee.logoutEmployee
});

const makefilterEmployeeAction = require('./filter-employee');
const filterEmployeeAction =makefilterEmployeeAction({
    InternalServerError:exceptions.InternalServerError,
    filterEmployee:employee.filterEmployee
});

const makegetAllSessionAction = require('./get-all-session');
const getAllSessionAction =makegetAllSessionAction({
    InternalServerError:exceptions.InternalServerError,
    getAllSession:employee.getAllSession
});

module.exports = Object.freeze({
    createEmployeeAction,
    deleteEmployeeAction,
    deleteEmployeeForCompanyAction,
    getAllEmployeeAction,
    getEmployeeAction,
    getEmployeeForCompanyAction,
    updateEmployeeAction,
    loginEmployeeAction,
    verifyEmployeeAction,
    logoutEmployeeAction,
    filterEmployeeAction,
    getAllSessionAction
})