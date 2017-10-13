/**
 * Created by Andrea on 9/30/2017.
 */

import {basicController, NOT_IMPLEMENTED} from "atp-rest";
import RolePermission from "../../model/role-permission";
import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'permission');

export default {
    get: basicController.entity.subCollection({
        model: RolePermission,
        permission: permissions.view,
        thisName: 'role',
        otherName: 'permission'
    }),
    post: NOT_IMPLEMENTED,
    ':permissionId': {
        delete: NOT_IMPLEMENTED
    }
}
