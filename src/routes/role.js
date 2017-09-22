/**
 * Created by Andy on 8/25/2017.
 */

import Role from "../model/role";

import {basicCollectionController, NOT_IMPLEMENTED} from 'atp-rest';

export default {
    get: basicCollectionController(Role, 'auth.role.view'),
    post: NOT_IMPLEMENTED,
    ':roleId': {
        get: NOT_IMPLEMENTED,
        delete: NOT_IMPLEMENTED,
        permission: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
