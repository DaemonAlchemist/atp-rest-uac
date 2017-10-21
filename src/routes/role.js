/**
 * Created by Andy on 8/25/2017.
 */

import Role from "../model/role";
import {createCrudPermissions} from "../util";
import permissionController from "../controller/role/permission";
import userController from "../controller/role/user";
import {o} from 'atp-sugar';
import {basicController, NOT_SUPPORTED} from 'atp-rest';

const permissions = createCrudPermissions('auth', 'role');
const model = Role;
const idField = 'roleId';

export default o(basicController.entity.crud({model, permissions, idField})).merge({
    [':' + idField]: {
        put: NOT_SUPPORTED,
        patch: NOT_SUPPORTED,
        permission: permissionController,
        user: userController
    }
}).raw;
