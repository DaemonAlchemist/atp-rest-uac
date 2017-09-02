/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userName => validate(
    (resolve, reject) => {
        !(new User().getByUserName(userName).locked) ? resolve() : reject();
    },
    "That user is locked",
    404
);
