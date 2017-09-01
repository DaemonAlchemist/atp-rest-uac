/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default userName => validate(
    () => {
        const user = new User().getByUserName(userName);
        return user.enabled;
    },
    "That user is not active",
    403
);
