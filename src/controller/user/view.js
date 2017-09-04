/**
 * Created by Andy on 8/25/2017.
 */

import User from '../../model/user';
import validate from "atp-validator";

export default (req, res) => {
    validate()
        .loggedIn()
        .hasPermission('auth.user.view')
        .required(req.params.userId, "User id")
        .isInteger(req.params.userId, "User id")
        .userExists(req.params.userId)
        .then(() => {
            new User().getByUserName(req.params.userName)
                .then(user => {
                    res.send({results: user});
                })
                .catch(err => {
                    res.send({messages: [
                        {
                            type: "error",
                            text: "There was an error accessing the user: " + err.syscall + "[" + err.code + "]"
                        }
                    ]});
                });
        });
}
