/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';
import User from "../model/user";
import UserPermissionCompiled from "../model/user-permission-compiled";
import {message, respondWith} from 'atp-rest';
import {createLoginToken} from '../util';
import {o} from 'atp-sugar';

export default (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    validator()
        .check("userName")
            .required(userName, 'Username')
            .isAlphaNumeric(userName, "Username")
        .check("password")
            .required(password, 'Password')
        .check("validLogin").if(["password", "userName"])
            .userNameExists(userName)
            .userNameActive(userName)
            .userNameUnlocked(userName)
            .validLogin(userName, password)
        .then(
            () => {
                new User().getByUserName(userName)
                    .then(
                        user => {
                            user = o(user).delete('passwordHash').delete('loginToken').raw;
                            const loginToken = createLoginToken(req, user);
                            res.header('Login-Token', loginToken);
                            new UserPermissionCompiled().forUser(user.id).then(
                                permissions => {
                                    user.permissions = permissions;
                                    respondWith.Success(req, res)({profile: user});
                                },
                                respondWith.InternalServerError(req, res)
                            );
                        },
                        respondWith.InternalServerError(req, res)
                    )
            },
            respondWith.Error(req, res)
        );
}
