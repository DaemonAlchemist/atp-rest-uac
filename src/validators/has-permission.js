/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import UserPermissionCompiled from "../model/user-permission-compiled";
import {loggedInUser} from "../util";

export default permissionName => validate(
    (resolve, reject) => {
        new UserPermissionCompiled().forUser(loggedInUser().id).includes(permissionName) ? resolve() : reject();
    },
    "You do not have permission to access this",
    403
);
