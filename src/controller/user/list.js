/**
 * Created by Andy on 8/25/2017.
 */

import User from '../../model/user';
import validate from 'atp-validator';

export default (req, res) => {
    validate()
        .loggedIn()
        .hasPermission('auth.user.view')
        .then(() => {
            new User().list()
                .then(rows => {
                    res.send({results: rows});
                })
                .catch(err => {
                    res.send({messages: [
                        {
                            type: "error",
                            text: "There was an error accessing the user ist: " + err.syscall + "[" + err.code + "]"
                        }
                    ]});
                });
        })
        .catch(errors => {
            res.send({errors});
        });
}
