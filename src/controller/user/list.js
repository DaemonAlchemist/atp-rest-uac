/**
 * Created by Andy on 8/25/2017.
 */

import User from '../../model/user';
import validate from 'atp-validator';
import {respondWith} from 'atp-rest';

export default (req, res) => {
    validate()
        .loggedIn(req)
        .hasPermission('auth.user.view')
        .validCollectionFilters(req.query)
        .then(
            () => {
                new User().filter(req.query).list()
                    .then(respondWith.Success(req, res))
                    .catch(respondWith.InternalServerError(req, res));
            },
            respondWith.ValidationFail(req, res)
        );
}
