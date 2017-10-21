/**
 * Created by Andy on 8/25/2017.
 */

import {basicController} from 'atp-rest';
import User from "../model/user";
import role from "../controller/user/role";
import permission from "../controller/user/permission";
import {o} from 'atp-sugar';

import {createCrudPermissions} from "../util";

const permissions = createCrudPermissions('auth', 'user');
const model = User;
const idField = 'userId';

export default o(basicController.entity.crud({model, permissions, idField})).merge({
    [':' + idField]: {
        role,
        permission
    }
}).raw;
