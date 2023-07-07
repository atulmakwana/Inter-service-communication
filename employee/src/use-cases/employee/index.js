const Joi  = require('joi');
const jwt = require('jsonwebtoken')
var geoip = require('geoip-lite');
const { v1 } = require('uuid');
const nodemailer = require("nodemailer");
const kafka = require('../kafka');

const { employeeDb, sessionDb } = require('../../data-access');
const Services  = require('../../internal-service-call');

const config = require('../../config');
const exceptions = require('../../exceptions')

const makecreateEmployee = require('./create-employee');
const createEmployee = makecreateEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
    runProducer:kafka.runProducer,
    getCopmanybyName:Services.companyService.getCopmanybyName,
    getDbEmployeebyEmail:employeeDb.getDbEmployeebyEmail,
    createDbEmployee:employeeDb.createDbEmployee
});

const makedeleteEmployeeForCompany = require('./delete-employee-for-company');
const deleteEmployeeForCompany = makedeleteEmployeeForCompany({
    Joi,  
    ValidationError:exceptions.ValidationError, 
    deleteDbEmployeeForCompany:employeeDb.deleteDbEmployeeForCompany
});

const makegetEmployee = require('./get-employee');
const getEmployee = makegetEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    getDbEmployee:employeeDb.getDbEmployee
});

const makedeleteEmployee = require('./delete-employee');
const deleteEmployee = makedeleteEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbEmployee:employeeDb.getDbEmployee,
    deleteDbEmployee:employeeDb.deleteDbEmployee
});

const makegetAllEmployee = require('./get-All-employee');
const getAllEmployee = makegetAllEmployee({
    getAllDbEmployee:employeeDb.getAllDbEmployee
});

const makegetEmployeeForCompany = require('./get-employee-for-company');
const getEmployeeForCompany = makegetEmployeeForCompany({
    Joi,  
    ValidationError:exceptions.ValidationError,
    getEmployeeForCompany:employeeDb.getDbEmployeeForCompany
});

const makegetEmployeebyEmail = require('./get-employee-by-email');
const getEmployeebyEmail = makegetEmployeebyEmail({
    Joi,  
    ValidationError:exceptions.ValidationError,
    getDbEmployeebyEmail:employeeDb.getDbEmployeebyEmail
});

const makeupdateEmployee = require('./update-employee');
const updateEmployee = makeupdateEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getEmployee,
    updateDbEmployee:employeeDb.updateDbEmployee
});

const makesendEmail = require('./sendEmail');
const sendEmail = makesendEmail({
    config,
    nodemailer,
});

const makeloginEmployee = require('./login-employee');
const loginEmployee = makeloginEmployee({
    Joi,  
    jwt,
    geoip,
    v1,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    ForbiddenError:exceptions.ForbiddenError,
    getEmployeebyEmail,
    createDbSession:sessionDb.createDbSession
});

const makeverifyEmployee = require('./verify-employee');
const verifyEmployee = makeverifyEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    verifyDbEmployee:employeeDb.verifyDbEmployee
});

const makelogoutEmployee = require('./logout-employee');
const logoutEmployee = makelogoutEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    logoutDbEmployee:sessionDb.logoutDbEmployee
});

const makefilterEmployee = require('./filter-employee');
const filterEmployee = makefilterEmployee({
    Joi,  
    ValidationError:exceptions.ValidationError,
    filterDbEmployee:sessionDb.filterDbEmployee
});

const makegetAllSession = require('./get-all-session');
const getAllSession = makegetAllSession({
    getAllDbSession:sessionDb.getAllDbSession
});

module.exports = Object.freeze({
    createEmployee,
    deleteEmployeeForCompany,
    deleteEmployee,
    getAllEmployee,
    getEmployeeForCompany,
    getEmployee,
    getEmployeebyEmail,
    updateEmployee,
    sendEmail,
    loginEmployee,
    verifyEmployee,
    logoutEmployee,
    filterEmployee,
    getAllSession
})