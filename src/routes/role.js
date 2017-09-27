/**
 * Created by Andy on 8/25/2017.
 */

import Role from "../model/role";

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';

const createPermission = 'auth.role.create';
const viewPermission = 'auth.role.view';
const updatePermission = 'auth.role.update';
const deletePermission = 'auth.role.delete';

const restParams = permission => ({
    model: Role,
    permission,
    idField: 'roleId',
    validate: (v, req) => v.isInteger(req.params.roleId)
});

export default {
    get: basicController.entity.collection({model: Role, permission: viewPermission}),
    post: basicController.entity.create({
        model: Role,
        permission: createPermission,
        validate: v => v, //TODO:  Implement role creation validations
    }),
    ':roleId': {
        get: basicController.entity.view(restParams(viewPermission)),
        delete: basicController.entity.delete(restParams(deletePermission)),
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
