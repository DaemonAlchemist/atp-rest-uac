/**
 * Created by Andy on 8/25/2017.
 */

import Role from "../model/role";
import {createCrudPermissions} from "../util";

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';

const permissions = createCrudPermissions('auth', 'role');

const restParams = permission => ({
    model: Role,
    permission,
    idField: 'roleId',
    validate: (v, req) => v.isInteger(req.params.roleId)
});

export default {
    get: basicController.entity.collection({model: Role, permission: permissions.view}),
    post: basicController.entity.create({
        model: Role,
        permission: permissions.create,
        validate: v => v, //TODO:  Implement role creation validations
    }),
    ':roleId': {
        get: basicController.entity.view(restParams(permissions.view)),
        delete: basicController.entity.delete(restParams(permissions.delete)),
        permission: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        },
        user: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
