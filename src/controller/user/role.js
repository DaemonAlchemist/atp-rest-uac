/**
 * Created by Andrea on 9/29/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import UserRole from "../../model/user-role";

import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'role');

export default {
    get: basicController.entity.subCollection({
        model: UserRole,
        permission: permissions.view,
        thisName: 'user',
        otherName: 'role',
    }),
    post: NOT_IMPLEMENTED,
    ':roleId': {
        delete: NOT_IMPLEMENTED
    }
};
