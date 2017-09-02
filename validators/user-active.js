/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default userId => validate(
    (resolve, reject) => {
        new User().getById(userId).enabled ? resolve() : reject();
    },
    "That user is not active",
    403
);
