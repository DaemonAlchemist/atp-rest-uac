/**
 * Created by Andy on 8/29/2017.
 */

import {error, validate} from "atp-validator";
import User from '../model/user';

export default userName => validate(
    new User().where('user_name', userName).count() === 1,
    "That user does not exist",
    404
);
