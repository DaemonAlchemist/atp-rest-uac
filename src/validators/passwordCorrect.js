
import {validate} from "atp-validator";
import User from "../model/user";

export default (userId, password) => validate(
    (resolve, reject) => {
        const user = new User();
        user.getById(userId)
            .then(userData => {
                user.verifyPassword(password, userData) ? resolve() : reject();
            })
            .catch(reject);
    },
    "Current password is incorrect",
    403
);
