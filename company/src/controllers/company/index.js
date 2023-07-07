const { company } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makecreateCompanyDataAction = require('./create-company-data');
const createCompanyDataAction = makecreateCompanyDataAction({
    InternalServerError:exceptions.InternalServerError,
    createCompanyData:company.createCompanyData
});

const makeupdateCompanyDataAction = require('./update-company-data');
const updateCompanyDataAction = makeupdateCompanyDataAction({
    InternalServerError:exceptions.InternalServerError,
    updateCompanyData:company.updateCompanyData
});

const makdeleteCompanyDataAction = require('./delete-company-data');
const deleteCompanyDataAction = makdeleteCompanyDataAction({
    InternalServerError:exceptions.InternalServerError,
    deleteCompanyData:company.deleteCompanyData
})

const makegetAllCompanyDataAction = require('./get-all-company-data');
const getAllCompanyDataAction = makegetAllCompanyDataAction({
    InternalServerError:exceptions.InternalServerError,
    getAllCompanyData:company.getAllCompanyData
});

const makegetCompanyDataAction = require('./get-company-data');
const getCompanyDataAction = makegetCompanyDataAction({
    InternalServerError:exceptions.InternalServerError,
    getCompanyData:company.getCompanyData
});

const makegetCompanybyNameAction = require('./get-company-by-name');
const getCompanybyNameAction = makegetCompanybyNameAction({
    InternalServerError:exceptions.InternalServerError,
    getCompanybyName:company.getCompanybyName
})

const makeUploadFileAction = require('./upload-file');
const uploadFileAction = makeUploadFileAction({
    InternalServerError:exceptions.InternalServerError,
    uploadFile:company.uploadFile
});

const makedownloadFileActionAction = require('./download-file');
const downloadFileAction = makedownloadFileActionAction({
    InternalServerError:exceptions.InternalServerError,
    downloadFile:company.downloadFile
})

const companyActions = Object.freeze({
    createCompanyDataAction,
    updateCompanyDataAction,
    deleteCompanyDataAction,
    getAllCompanyDataAction,
    getCompanyDataAction,
    getCompanybyNameAction,
    uploadFileAction,
    downloadFileAction
});

module.exports = companyActions;