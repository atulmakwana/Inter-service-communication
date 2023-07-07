const { role } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makeCreateRoleAction = require('./create-role');
const createRoleAction = makeCreateRoleAction({
    InternalServerError:exceptions.InternalServerError,
    createRole:role.createRole,
});

const makeDeleteRoleAction = require('./delete-role');
const deleteRoleAction = makeDeleteRoleAction({
    InternalServerError:exceptions.InternalServerError,
    deleteRole:role.deleteRole
});

const makeAssignRoleAtion = require('./assign-role');
const assignRoleAction = makeAssignRoleAtion({
    InternalServerError:exceptions.InternalServerError,
    assignRole:role.assignRole,
});

const makeGetRoleByIdAction = require('./get-role-by-id');
const getRoleByIdAction = makeGetRoleByIdAction({
    InternalServerError:exceptions.InternalServerError,
    getRoleById:role.getRoleById,
});

const makegetAllRoleAction = require('./get-all-role');
const getAllRoleAction = makegetAllRoleAction({
    InternalServerError:exceptions.InternalServerError,
    getAllRole:role.getAllRole,
});

const makeupdateRoleAction = require('./update-role');
const updateRoleAction = makeupdateRoleAction({
    InternalServerError:exceptions.InternalServerError,
    updateRole:role.updateRole,
});

const makeaddPermissionAction = require('./add-permission')
const addPermissionAction = makeaddPermissionAction({
    InternalServerError:exceptions.InternalServerError,
    addPermission:role.addPermission,
});

const makeDeleteMasterForCompanyAction = require('./delete-master-for-company');
const deleteMasterForCompanyAction = makeDeleteMasterForCompanyAction({
    InternalServerError:exceptions.InternalServerError,
    deleteMasterForCompany:role.deleteMasterForCompany,
});

module.exports = Object.freeze({
    createRoleAction,
    deleteRoleAction,
    assignRoleAction,
    getRoleByIdAction,
    getAllRoleAction,
    updateRoleAction,
    addPermissionAction,
    deleteMasterForCompanyAction
})