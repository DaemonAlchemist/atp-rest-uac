/**
 * Created by Andy on 8/25/2017.
 */

import {basicController} from 'atp-rest';
import {validate} from 'atp-validator';
import User from "../model/user";
import role from "../controller/user/role";
import permission from "../controller/user/permission";
import {o} from 'atp-sugar';

import {createCrudPermissions} from "../util";

const permissions = createCrudPermissions('auth', 'user');
const model = User;
const idField = 'userId';

export default o(basicController.entity.crud({
    model, permissions, idField,
    validateUpdate: (validator, req) => validator
        .isOptional(req.body.newPassword, v => v
            .check("currentPassword")
                .isOptional(req.body.currentPassword, "current password", v => v
                    .passwordCorrect(req.params.userId, req.body.currentPassword)
                )
            .check("passwordResetPermission")
                .hasPermission("auth.user.password.reset")
            .check("goodNewPassword").ifAny(["currentPassword", "passwordResetPermission"])
                .required(req.body.newPasswordConfirm, "new password confirmation")
                .custom(validate(
                    () => req.body.newPassword === req.body.newPasswordConfirm,
                    "New passwords do not match",
                    400
                ))
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
        permission
    }
}).raw;
