/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';
import User from "../model/user";

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
            .userActive(userName)
            .userUnlocked(userName)
            .validLogin(userName, password)
        .then(
            () => {
                const user = new User();
                const userData = user.getByUserName(userName)
                const loginToken = user.createLoginToken(req, userData);
                res
                    .header('loginToken', loginToken)
                    .cookie('loginToken', loginToken)
                    .send({
                        messages: [{'type': 'success', 'text': 'Login successful'}],
                        results: {loginToken}
                    });
            },
            errors => {
                res.status(errors[0].code).send({messages: errors});
            }
        );
}
