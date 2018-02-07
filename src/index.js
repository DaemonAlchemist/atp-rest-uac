/**
 * Created by Andy on 8/25/2017.
 */

import user from './routes/user';
import key from "./routes/key";
import login from "./routes/login";
import role from "./routes/role";
import permission from "./routes/permission";
import {createCrudPermissions} from "./util";
import User from './model/user';

import validators from "./validators/index";

export default ({
    routes: {user, key, login, permission, role},
    config: {
        validators
    }
});

export {createCrudPermissions, User};