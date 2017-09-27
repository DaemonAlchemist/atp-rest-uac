/**
 * Created by Andy on 8/25/2017.
 */

import Role from "../model/role";

import {basicCollectionController, basicEntityController, basicEntityDeleteController, NOT_IMPLEMENTED} from 'atp-rest';

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
    get: basicCollectionController({model: Role, permission: viewPermission}),
    post: NOT_IMPLEMENTED,
    ':roleId': {
        get: basicEntityController(restParams(viewPermission)),
        delete: basicEntityDeleteController(restParams(deletePermission)),
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
