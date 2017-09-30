/**
 * Created by Andy on 8/25/2017.
 */

import {basicController} from 'atp-rest';
import User from "../model/user";
import roleController from "../controller/user/role";
import permissionController from "../controller/user/permission";

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
        role: roleController,
        permission: permissionController
    }
};
