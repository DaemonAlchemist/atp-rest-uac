/**
 * Created by Andy on 8/25/2017.
 */

import User from '../../model/user';
import validate from "atp-validator";
import {response} from 'atp-rest';

export default (req, res) => {
    const id = req.params.userId;
    validate()
        .loggedIn()
        .hasPermission('auth.user.view')
        .required(id, "User id")
        .isInteger(id, "User id")
        .userExists(id)
        .then(
            () => {
                new User().getById(id)
                    .then(response.Success(req, res))
                    .catch(response.InternalServerError(req, res));
            },
            response.ValidationFail(req, res)
        );
}
