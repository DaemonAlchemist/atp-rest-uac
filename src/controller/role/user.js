/**
 * Created by Andrea on 9/30/2017.
 */

import {basicController, NOT_IMPLEMENTED} from "atp-rest";
import {createCrudPermissions} from "../../util";
import UserRole from "../../model/user-role";

const permissions = createCrudPermissions('auth', 'user');

export default {
    get: basicController.entity.subCollection({
        model: UserRole,
        permission: permissions.view,
        thisName: 'role',
        otherName: 'user'
    }),
    post: NOT_IMPLEMENTED,
    delete: NOT_IMPLEMENTED
}