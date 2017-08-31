/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';
import User from "../model/user";

export default (req, res, next) => {
    validator()
        .required(req.body.userName, 'Username')
        .required(req.body.password, 'Password')
        .isAlphaNumeric(req.body.userName)
        .userNameExists(req.body.userName)
        .userActive(req.body.userName)
        .userUnlocked(req.body.userName)
        .validLogin(req.body.userName, req.body.password)
        .then(() => {
            const user = new User();
            user.getByUserName(req.body.userName).then(([err, userData, field]) => {
                const loginToken = user.createLoginToken(req, userData);
                res
                    .header('loginToken', loginToken)
                    .cookie('loginToken', loginToken)
                    .send({
                        messages: [{'type': 'success', 'text': 'Login successful'}],
                        results: {loginToken}
                    });
            });
        })
        .catch((errors) => {
            res.send({messages: errors});
        });
}
