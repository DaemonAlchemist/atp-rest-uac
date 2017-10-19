/**
 * Created by Andy on 8/29/2017.
 */

import {validate} from "atp-validator";
import User from '../model/user';
import {error} from 'atp-active-record';

export default userName => validate(
    (resolve, reject) => {
        new User().where('userName', userName).count()
            .then(result => {result === 1 ? resolve() : reject();})
            .catch(error("Checking whether your account exists", reject));
    },
    "That user does not exist",
    404
);
