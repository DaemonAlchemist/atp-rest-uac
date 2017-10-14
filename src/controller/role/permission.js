/**
 * Created by Andrea on 9/30/2017.
 */

import {basicController, NOT_IMPLEMENTED} from "atp-rest";
import RolePermission from "../../model/role-permission";
import {RolePermissionBase} from "../../model/role-permission";
import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'permission');

export default {
    get: basicController.entity.subCollection({
        model: RolePermission,
        permission: permissions.view,
        thisName: 'role',
        otherName: 'permission'
    }),
    post: basicController.entity.create({
        model: RolePermissionBase,
        permission: permissions.create,
        validate: (v, req) => v
            .check("role")
                .required(req.params.roleId, "Role id")
                .isInteger(req.params.roleId, "Role id")
            .check("permission")
                .required(req.body.permissionId, "Permission id")
                .isInteger(req.body.permissionId, "Permission id")
            .check("final").if(['role', 'permission'])
    }),
    ':permissionId': {
        delete: NOT_IMPLEMENTED
    }
}
