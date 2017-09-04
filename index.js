/**
 * Created by Andy on 8/25/2017.
 */

import userRoutes from './src/routes/user';
import loginRoutes from "./src/routes/login";
import validators from "./src/validators/index";

export default ({
    routes: {
        user: userRoutes,
        login: loginRoutes,
    },
    config: {
        validators
    }
});
