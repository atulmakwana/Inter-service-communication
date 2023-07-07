const controllers = require('./controllers');
const upload = require('./middlewares/multerConfig')
const express= require('express');

const router=express.Router();


router.get('/company/:id', controllers.companyActions.getCompanyDataAction);
router.get('/company', controllers.companyActions.getAllCompanyDataAction);
router.get('/company-by-name/:name', controllers.companyActions.getCompanybyNameAction);
router.post('/company', controllers.companyActions.createCompanyDataAction);
router.put('/company/:id', controllers.companyActions.updateCompanyDataAction);
router.delete('/company/:id', controllers.companyActions.deleteCompanyDataAction);
router.post('/company/uploadfile',upload.single('uploadedFile') ,controllers.companyActions.uploadFileAction);
router.get('/company/downloadfile/:file',controllers.companyActions.downloadFileAction);

module.exports = { router };