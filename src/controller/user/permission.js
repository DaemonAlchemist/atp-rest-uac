/**
 * Created by Andrea on 9/29/2017.
 */

import {basicController} from 'atp-rest';
import UserPermissionCompiled from "../../model/user-permission-compiled";

import {createCrudPermissions} from "../../util";

const permissions = createCrudPermissions('auth', 'permission');

export default {
    get: basicController.entity.collection({
        model: UserPermissionCompiled,
        permission: permissions.view,
        filter: req => ({userId: req.params.userId}),
        processResults: permissions => ({results: permissions.map(p => p.permissionName)})
    }),
};