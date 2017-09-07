/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default (userName, password) => validate(
    (resolve, reject) => {
        const user = new User();
        user.getByUserName(userName)
            .then(userData => {
                user.hashPassword(password) === userData.password_hash ? resolve() : reject();
            })
            .catch(error("Checking your account status", reject));
    },
    "Invalid username or password",
    401
);
