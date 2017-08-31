/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userIdOrUserName => validate(
    true, //TODO:  Implement
    "That user is not active",
    404
);
