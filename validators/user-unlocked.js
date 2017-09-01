/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userId => validate(
    () => {
        const user = new User().getById(userId);
        return !user.locked;
    },
    "That user is locked",
    404
);
