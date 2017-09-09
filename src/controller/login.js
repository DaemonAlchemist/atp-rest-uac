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
            .userNameActive(userName)
            .userNameUnlocked(userName)
            //.validLogin(userName, password)
        .then(
            () => {
                const user = new User();
                const userData = user.getByUserName(userName)
                const loginToken = user.createLoginToken(req, userData);
                res
                    .header('Login-Token', loginToken)
                    .send({
                        messages: [{'type': 'success', 'text': 'Login successful'}],
                    });
            },
            errors => {
                res.status(errors[0].code || 500).send({messages: errors});
            }
        );
}
