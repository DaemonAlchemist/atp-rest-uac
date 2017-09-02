/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userId => validate(
    (resolve, reject) => {
        !(new User().getById(userId).locked) ? resolve() : reject();
    },
    "That user is locked",
    404
);
