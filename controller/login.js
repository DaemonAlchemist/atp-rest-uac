/**
 * Created by Andy on 8/29/2017.
 */

import validator from 'atp-validator';

export default (req, res) => {
    validator()
        .required(req.body.userName, 'Username')
        .required(req.body.password)
        .userExists(req.body.userName)
        .userActive(req.body.userName)
        .userUnlocked(req.body.userName)
        .then(() => {
            //TODO:  Handle login
            res.send("TODO:  Implement login");
        });
}