/**
 * Created by Andrea on 9/29/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import UserRole from "../../model/user-role";
import {UserRoleBase} from "../../model/user-role";

import {createCrudPermissions} from "../../util";

const rolePermissions = createCrudPermissions('auth', 'role');
const userPermissions = createCrudPermissions('auth', 'user');
export default {
    get: basicController.entity.subCollection({
        model: UserRole,
        permission: rolePermissions.view,
        thisName: 'user',
        otherName: 'role',
    }),
    post: basicController.entity.create({
        model: UserRoleBase,
        permission: userPermissions.update,
        validate: (v, req) => v
            .check("role")
                .required(req.params.roleId, "Role id")
                .isInteger(req.params.roleId, "Role id")
            .check("user")
                .required(req.body.userId, "User id")
                .isInteger(req.body.userId, "User id")
            .check("final").if(['role', 'user'])
    }),
    ':roleId': {
        delete: basicController.entity.unlink({
            model: UserRoleBase,
            permission: userPermissions.update,
            validate: (v, req) => v
                .check("role")
                    .required(req.params.roleId, "Role id")
                    .isInteger(req.params.roleId, "Role id")
                .check("user")
                    .required(req.params.userId, "User id")
                    .isInteger(req.params.userId, "User id")
                .check("final").if(['role', 'user'])
        })
    }
};
