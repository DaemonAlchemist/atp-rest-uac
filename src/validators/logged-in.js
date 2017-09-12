/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import {isLoggedIn} from "../util";

export default request => validate(
    (resolve, reject) => isLoggedIn(request) ? resolve() : reject(),
    "You must be logged in to access this resource",
    401
);
