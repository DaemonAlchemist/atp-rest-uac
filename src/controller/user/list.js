/**
 * Created by Andy on 8/25/2017.
 */

import User from '../../model/user';
import validate from 'atp-validator';
import {response} from 'atp-rest';

export default (req, res) => {
    validate()
         .loggedIn(req)
         .hasPermission('auth.user.view')
        .then(
            () => {
                new User().list()
                    .then(response.Success(req, res))
                    .catch(response.InternalServerError(req, res));
            },
            response.ValidationFail(req, res)
        );
}
