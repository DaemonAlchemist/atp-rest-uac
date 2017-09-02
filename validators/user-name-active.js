/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default userName => validate(
    (resolve, reject) => {
        new User().getByUserName(userName).enabled ? resolve() : reject();
    },
    "That user is not active",
    403
);
