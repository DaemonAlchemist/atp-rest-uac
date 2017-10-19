/**
 * Created by Andy on 8/25/2017.
 */

import userRoutes from './routes/user';
import loginRoutes from "./routes/login";
import roleRoutes from "./routes/role";
import permissionRoutes from "./routes/permission";
import {createCrudPermissions} from "./util";

import validators from "./validators/index";

export default ({
    routes: {
        user: userRoutes,
        login: loginRoutes,
        permission: permissionRoutes,
        role: roleRoutes,
    },
    config: {
        validators
    }
});

export {createCrudPermissions};