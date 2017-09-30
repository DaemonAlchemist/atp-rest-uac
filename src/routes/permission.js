/**
 * Created by Andy on 8/25/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import Permission from "../model/permission";
import {createCrudPermissions} from "../util";
import roleController from "../controller/permission/role";

const permissions = createCrudPermissions('auth', 'permission');

const restParams = permission => ({
    model: Permission,
    permission,
    idField: 'permissionId',
    validate: (v, req) => v.isInteger(req.params.permissionId)
});

export default {
    get: basicController.entity.collection({model: Permission, permission: permissions.view}),
    post: basicController.entity.create({
        model: Permission,
        permission: permissions.create,
        validate: v => v, //TODO:  Implement permission creation validations
    }),
    ':permissionId': {
        get: basicController.entity.view(restParams(permissions.view)),
        delete: basicController.entity.delete(restParams(permissions.delete)),
        role: roleController
    }
};
