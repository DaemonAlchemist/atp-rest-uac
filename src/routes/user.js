/**
 * Created by Andy on 8/25/2017.
 */

import {basicController} from 'atp-rest';
import {validate} from 'atp-validator';
import User from "../model/user";
import role from "../controller/user/role";
import keyController from "./key";
import permission from "../controller/user/permission";
import {o} from 'atp-sugar';

import {createCrudPermissions} from "../util";

const permissions = createCrudPermissions('auth', 'user');
const keyPermissions = createCrudPermissions('auth', 'key');
const model = User;
const idField = 'userId';

export default o(basicController.entity.crud({
    model, permissions, idField,
    validateUpdate: (validator, req) => validator
        .isOptional(req.body.newPassword, v => v
            .check("validPasswordUpdate")
                .isOptional(req.body.currentPassword, "current password", v => v
                    .passwordCorrect(req.params.userId, req.body.currentPassword)
                )
                .required(req.body.newPasswordConfirm, "new password confirmation")
                .custom(validate(
                    () => req.body.newPassword === req.body.newPasswordConfirm,
                    "New passwords do not match",
                    400
                ))
            .check("passwordResetPermission")
                .hasPermission("auth.user.password.reset")
            .check("goodNewPassword").ifAny(["validPasswordUpdate", "passwordResetPermission"])
        ),
    preUpdate: data => data.newPassword
        ? o(data)
            .merge({passwordHash: new User().hashPassword(data.newPassword)})
            .delete('currentPassword')
            .delete('newPassword')
            .delete('newPasswordConfirm')
            .raw
        : data
})).merge({
    [':' + idField]: {
        role,
        permission,
        key: {
            get: basicController.entity.children(keyPermissions, idField, keyController)
        },
    }
}).raw;
