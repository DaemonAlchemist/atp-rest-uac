/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import UserPermissionCompiled from "../model/user-permission-compiled";
import {loggedInUser} from "../util";

export default (permissionName, request) => validate(
    (resolve, reject) => {
        loggedInUser(request).then(user => {
            new UserPermissionCompiled()
                .forUser(user.id)
                .then(permissions => {
                    permissions.includes(permissionName) ? resolve() : reject();
                });
        }, err => reject(err));
    },
    "You do not have permission to access this resource: " + permissionName,
    403
);
