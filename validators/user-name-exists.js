/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";

export default userName => validate(
    true, //TODO:  Implement
    "That user does not exist",
    404
);
