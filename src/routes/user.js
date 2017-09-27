/**
 * Created by Andy on 8/25/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import User from "../model/user";
import {createCrudPermissions} from "../util";

const permissions = createCrudPermissions('auth', 'user');

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
    get: basicController.entity.collection({model: User, permission: permissions.view}),
    post: basicController.entity.create({
        model: User,
        permission: permissions.create,
        validate: v => v, //TODO:  Implement user creation validations
    }),
    ':userId': {
        get: basicController.entity.view(restParams(permissions.view)),
        put: basicController.entity.replace(updateParams(permissions.update)),
        patch: basicController.entity.update(updateParams(permissions.update)),
        delete: basicController.entity.delete(restParams(permissions.delete)),
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        },
        permission: {
            get: NOT_IMPLEMENTED,
        }
    }
};
