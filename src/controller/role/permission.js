
import {basicController} from "atp-rest";
import RolePermission from "../../model/role-permission";
import {RolePermissionBase} from "../../model/role-permission";
import {createCrudPermissions} from "../../util";

export default basicController.entity.many2many(
    'role', createCrudPermissions('auth', 'role'),
    'permission', createCrudPermissions('auth', 'permission'),
    RolePermission, RolePermissionBase
);
