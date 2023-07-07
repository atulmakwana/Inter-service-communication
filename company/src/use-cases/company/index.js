const Joi  = require('joi')
const nodemailer = require('nodemailer');
const kafka = require('kafkajs');
const { Storage } = require('@google-cloud/storage');

const { companyDb } = require('../../data-access');
const Services = require('../../internal-service-call');
const config = require('../../config');
const exceptions = require('../../exceptions')


const makecreateCompanyData = require('./create-company-data');
const createCompanyData = makecreateCompanyData({
    Joi, 
    ValidationError:exceptions.ValidationError,
    ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
    getDbCompanybyName:companyDb.getDbCompanybyName,
    createDbCompanyData:companyDb.createDbCompanyData
});

const makedeleteCompanyData = require('./delete-company-data');
const deleteCompanyData = makedeleteCompanyData({
    Joi, 
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbCompanyData:companyDb.getDbCompanyData,
    deleteDbCompanyData:companyDb.deleteDbCompanyData,
    deleteRoleForCopmany:Services.roleService.deleteRoleForCopmany,
    deleteAllEmployeesbyCopmany:Services.employeeService.deleteAllEmployeesbyCopmany,
});

const makegetCompanyData = require('./get--company-data');
const getCompanyData = makegetCompanyData({
    Joi, 
    ValidationError:exceptions.ValidationError,
    getDbCompanyData:companyDb.getDbCompanyData
});

const makegetAllCompanyData = require('./get-All--company-data');
const getAllCompanyData = makegetAllCompanyData({
    getAllDbCompanyData:companyDb.getAllDbCompanyData
});

const makeupdateCompanyData = require('./update--company-data');
const updateCompanyData = makeupdateCompanyData({
    Joi, 
    ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    ValidationError:exceptions.ValidationError,
    getDbCompanyData:companyDb.getDbCompanyData,
    getDbCompanybyName:companyDb.getDbCompanybyName,
    updateDbCompanyData:companyDb.updateDbCompanyData
});

const makegetCompanybyName = require('./get-company-by-name');
const getCompanybyName = makegetCompanybyName({
    Joi, 
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    ValidationError:exceptions.ValidationError,
    getDbCompanybyName:companyDb.getDbCompanybyName
});

const makesendEmail = require('./sendEmail');
const sendEmail = makesendEmail({
    nodemailer,
    config
});

const makeUploadFile = require('./upload-file');
const uploadFile = makeUploadFile({
    Storage
})

const makeDownloadFile = require('./download-file');
const downloadFile = makeDownloadFile({
    Storage
})

module.exports = Object.freeze({
    createCompanyData,
    deleteCompanyData,
    getCompanyData,
    getAllCompanyData,
    updateCompanyData,
    getCompanybyName,
    sendEmail,
    uploadFile,
    downloadFile
})