/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import {error} from 'atp-active-record';
import User from "../model/user";

export default userId => validate(
    (resolve, reject) => {
        new User().where('id', userId).count()
            .then(result => {result === 1 ? resolve() : reject();})
            .catch(error("Checking your user account", reject));
    },
    "That user does not exist",
    404
);
