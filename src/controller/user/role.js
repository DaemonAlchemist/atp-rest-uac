/**
 * Created by Andrea on 9/29/2017.
 */

import {basicController} from 'atp-rest';
import UserRole from "../../model/user-role";
import {UserRoleBase} from "../../model/user-role";

import {createCrudPermissions} from "../../util";

export default basicController.entity.many2many(
    'user', createCrudPermissions('auth', 'user'),
    'role', createCrudPermissions('auth', 'role'),
    UserRole, UserRoleBase
);

