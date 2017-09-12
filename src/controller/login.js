/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';
import User from "../model/user";
import UserPermissionCompiled from "../model/user-permission-compiled";
import {message, response} from 'atp-rest';
import {createLoginToken} from '../util';
import {o} from 'atp-sugar';

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
                            user = o(user).delete('password_hash').delete('login_token').raw;
                            const loginToken = createLoginToken(req, user);
                            res.header('Login-Token', loginToken);
                            new UserPermissionCompiled().forUser(user.id).then(
                                permissions => {
                                    user.permissions = permissions;
                                    response.Success(req, res)(user);
                                },
                                response.InternalServerError(req, res)
                            );
                        },
                        response.InternalServerError(req, res)
                    )
            },
            response.ValidationFail(req, res)
        );
}
