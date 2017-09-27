/**
 * Created by Andy on 8/25/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
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

const updateParams = permission => ({
    model: User,
    permission,
    idField: "userId",
    validate: v => v, //TODO:  Implement user edit validations
})

export default {
    get: basicController.entity.collection({model: User, viewPermission}),
    post: basicController.entity.create({
        model: User,
        permission: createPermission,
        validate: v => v, //TODO:  Implement user creation validations
    }),
    ':userId': {
        get: basicController.entity.view(restParams(viewPermission)),
        put: basicController.entity.replace(updateParams(updatePermission)),
        patch: basicController.entity.update(updateParams(updatePermission)),
        delete: basicController.entity.delete(restParams(deletePermission)),
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
