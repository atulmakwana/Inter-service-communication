const Joi  = require('joi');

const config = require('../../config');
const { roleDb } = require('../../data-access');
const exceptions = require('../../exceptions')

const makecreateRole = require('./create-role');
const createRole = makecreateRole({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    createDbRole:roleDb.createDbRole,
});

const makedeleteRole = require('./delete-role');
const deleteRole = makedeleteRole({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbRoleById:roleDb.getDbRoleById,
    getDbRoleByCompany:roleDb.getDbRoleByCompany,
    getDbMasterRole:roleDb.getDbMasterRole,
    deleteDbRole:roleDb.deleteDbRole,
});

const makeassignRole = require('./assign-role');
const assignRole = makeassignRole({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbRoleById:roleDb.getDbRoleById,
    assignDbRole:roleDb.assignDbRole,
});

const makegetRoleById = require('./get-role-by-id');
const getRoleById = makegetRoleById({
    Joi,
    ValidationError:exceptions.ValidationError,
    getDbRoleById:roleDb.getDbRoleById,
});

const makegetAllRole = require('./get-all-roles');
const getAllRole = makegetAllRole({
    getDbAllRole:roleDb.getDbAllRole
});

const makegetRoleForEmployee = require('./get-role-for-employee');
const getRoleForEmployee = makegetRoleForEmployee({
    Joi,
    ValidationError:exceptions.ValidationError,
    getDbRoleForEmployee:roleDb.getDbRoleForEmployee
});

const makeupdateRole = require('./update-role');
const updateRole = makeupdateRole({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbRoleById:roleDb.getDbRoleById,
    updateDbRole:roleDb.updateDbRole
});

const makeaddPermission = require('./add-permission');
const addPermission = makeaddPermission({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbRoleById:roleDb.getDbRoleById,
    addDbPermission:roleDb.addDbPermission
});

const makedeleteMasterForCompany = require('./delete-masters-for-company');
const deleteMasterForCompany = makedeleteMasterForCompany({
    Joi,
    ValidationError:exceptions.ValidationError,
    deleteDbMasterForCompany:roleDb.deleteDbMasterForCompany
})

module.exports = Object.freeze({
    createRole,
    deleteRole,
    assignRole,
    getRoleById,
    getAllRole,
    getRoleForEmployee,
    updateRole,
    addPermission,
    deleteMasterForCompany,
});