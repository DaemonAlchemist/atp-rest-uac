/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default userName => validate(
    (resolve, reject) => {
        new User().where('user_name', userName).count(result => {
            if(typeof result === 'object') {
                reject(error(
                    "There was an error checking your userName: " + result.syscall + "[" + result.code + "]",
                    500
                ));
            }

            result === 1 ? resolve() : reject();
        });
    },
    "That user does not exist",
    404
);
