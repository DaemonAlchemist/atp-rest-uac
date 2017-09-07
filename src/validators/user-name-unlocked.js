/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import User from "../model/user";
import {error} from 'atp-active-record';

export default userName => validate(
    (resolve, reject) => {
        new User().getByUserName(userName)
            .then(user => {!user.locked ? resolve() : reject();})
            .catch(error("account status", reject))
    },
    "That user is locked",
    404
);
