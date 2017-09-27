/**
 * Created by Andy on 8/25/2017.
 */

import {basicCollectionController, basicEntityController, basicEntityDeleteController, NOT_IMPLEMENTED} from 'atp-rest';
import Permission from "../model/permission";

const createPermission = 'auth.permission.create';
const viewPermission = 'auth.permission.view';
const updatePermission = 'auth.permission.update';
const deletePermission = 'auth.permission.delete';

const restParams = permission => ({
    model: Permission,
    permission,
    idField: 'permissionId',
    validate: (v, req) => v.isInteger(req.params.permissionId)
});

export default {
    get: basicCollectionController({model: Permission, permission: viewPermission}),
    post: NOT_IMPLEMENTED,
    ':permissionId': {
        get: basicEntityController(restParams(viewPermission)),
        delete: basicEntityDeleteController(restParams(deletePermission)),
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
