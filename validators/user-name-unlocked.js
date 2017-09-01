/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userName => validate(
    () => {
        const user = new User().getByUserName(userName);
        return !user.locked;
    },
    "That user is locked",
    404
);
