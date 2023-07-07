const controllers = require('./controllers');
const express = require('express');

const authorizeEmployee = require('./middlewares/authentication');
const checkPermission = require('./middlewares/check-permission')
const checkMaster = require('./middlewares/check-master');

const router = express.Router();


router.get('/employee', controllers.employeeActions.getAllEmployeeAction);
router.get('/employee/:id', authorizeEmployee, controllers.employeeActions.getEmployeeAction);
router.get('/employee/verify/:id', controllers.employeeActions.verifyEmployeeAction);
router.post('/employee', controllers.employeeActions.createEmployeeAction);
router.put('/employee/:id', controllers.employeeActions.updateEmployeeAction);
router.delete('/employee/:id', controllers.employeeActions.deleteEmployeeAction);
router.get('/employee/company/:id', controllers.employeeActions.getEmployeeForCompanyAction);
router.delete('/employee/company/:id', controllers.employeeActions.deleteEmployeeForCompanyAction);

router.get('/session', authorizeEmployee,checkPermission, controllers.employeeActions.getAllSessionAction)
router.post('/employee/login', controllers.employeeActions.loginEmployeeAction)
router.post('/session/filter', authorizeEmployee,checkPermission, controllers.employeeActions.filterEmployeeAction);
router.post('/session/order', authorizeEmployee,checkPermission, controllers.employeeActions.filterEmployeeAction);
router.post('/session/search', authorizeEmployee,checkPermission, controllers.employeeActions.filterEmployeeAction);
router.delete('/employee/logout/:id', authorizeEmployee,checkPermission,  controllers.employeeActions.logoutEmployeeAction);

router.get('/role', authorizeEmployee,checkPermission, controllers.roleAction.getAllRoleAction);
router.post('/role', authorizeEmployee,checkPermission, controllers.roleAction.createRoleAction);
router.post('/role/assign', authorizeEmployee,checkPermission, controllers.roleAction.assignRoleAction);
router.put('/role', authorizeEmployee,checkPermission, controllers.roleAction.updateRoleAction);
router.patch('/role', authorizeEmployee,checkPermission, controllers.roleAction.addPermissionAction);
router.delete('/role/:id', authorizeEmployee,checkPermission, controllers.roleAction.deleteRoleAction);
router.delete('/role/company/:id', controllers.roleAction.deleteMasterForCompanyAction);

module.exports = { router };