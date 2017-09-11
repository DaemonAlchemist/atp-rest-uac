/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';
import User from "../model/user";
import {message, response} from 'atp-rest';
import {createLoginToken} from '../util';

export default (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    validator()
        .chain("userName")
            .required(userName, 'Username')
            .isAlphaNumeric(userName, "Username")
        .all("password")
            .required(password, 'Password')
        .chain("validLogin").if(["password", "userName"])
            .userNameExists(userName)
            .userNameActive(userName)
            .userNameUnlocked(userName)
            .validLogin(userName, password)
        .then(
            () => {
                new User().getByUserName(userName)
                    .then(
                        user => {
                            const loginToken = createLoginToken(req, user);
                            res.header('Login-Token', loginToken);
                            response.Success(req, res)(null);
                        },
                        response.InternalServerError(req, res)
                    )
            },
            response.ValidationFail(req, res)
        );
}
