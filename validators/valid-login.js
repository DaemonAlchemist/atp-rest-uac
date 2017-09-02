/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default (userName, password) => validate(
    (resolve, reject) => resolve(), //TODO:  Implement
    "Invalid username or password",
    401
);
