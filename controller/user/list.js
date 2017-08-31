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
            new User().list((err, rows, field) => {
                res.send({results: rows});
            });
        })
        .catch(errors => {
            res.send({errors});
        });
}
