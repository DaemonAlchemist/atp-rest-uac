/**
 * Created by Andy on 8/25/2017.
 */

import {basicController, NOT_IMPLEMENTED, NOT_SUPPORTED} from 'atp-rest';
import Permission from "../model/permission";
import {createCrudPermissions} from "../util";
import roleController from "../controller/permission/role";
import {o} from 'atp-sugar';

const permissions = createCrudPermissions('auth', 'permission');
const model = Permission;
const idField = 'permissionId';

export default o(basicController.entity.crud({model, permissions, idField})).merge({
    [';' + idField]: {
        put: NOT_SUPPORTED,
        patch: NOT_SUPPORTED,
        role: roleController
    }
}).raw;
