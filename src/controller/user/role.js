/**
 * Created by Andrea on 9/29/2017.
 */

import {basicController, NOT_IMPLEMENTED} from 'atp-rest';
import UserRole from "../../model/user-role";

import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'role');

export default {
    get: basicController.entity.collection({
        model: UserRole,
        permission: permissions.view,
        filter: req => ({user_id: req.params.userId}),
        processResults: roles => roles.map(role => ({
            id: role.role_id,
            version: role.role_version
        }))
    }),
    post: NOT_IMPLEMENTED,
    delete: NOT_IMPLEMENTED
}