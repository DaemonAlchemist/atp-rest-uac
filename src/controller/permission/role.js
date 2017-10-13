/**
 * Created by Andrea on 9/30/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import RolePermission from "../../model/role-permission";
import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'role');

export default {
    get: basicController.entity.subCollection({
        model: RolePermission,
        permission: permissions.view,
        thisName: 'permission',
        otherName: 'role'
    }),
    post: NOT_IMPLEMENTED,
    ':roleId': {
        delete: NOT_IMPLEMENTED
    }
};
