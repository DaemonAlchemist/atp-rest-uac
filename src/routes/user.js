/**
 * Created by Andy on 8/25/2017.
 */

import {basicCollectionController, basicEntityController, basicEntityDeleteController, NOT_IMPLEMENTED} from 'atp-rest';
import User from "../model/user";

const createPermission = 'auth.user.create';
const viewPermission = 'auth.user.view';
const updatePermission = 'auth.user.update';
const deletePermission = 'auth.user.delete';

const restParams = permission => ({
    model: User,
    permission,
    idField: 'userId',
    validate: (v, req) => v.isInteger(req.params.userId, "userId").userExists(req.params.userId)
});

export default {
    get: basicCollectionController({model: User, viewPermission}),
    post: NOT_IMPLEMENTED,
    ':userId': {
        get: basicEntityController(restParams(viewPermission)),
        put: NOT_IMPLEMENTED,
        patch: NOT_IMPLEMENTED,
        delete: basicEntityDeleteController(restParams(deletePermission)),
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        },
        permission: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
