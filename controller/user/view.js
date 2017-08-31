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
            new User().getByUserName(req.params.userName, (err, user, field) => {
                res.send({results: user});
            });
        });
}
