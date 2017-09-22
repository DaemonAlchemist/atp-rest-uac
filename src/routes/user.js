/**
 * Created by Andy on 8/25/2017.
 */

import userViewController from '../controller/user/view';
import {basicCollectionController, NOT_IMPLEMENTED} from 'atp-rest';
import User from "../model/user";

export default {
    get: basicCollectionController(User, 'auth.user.view'),
    post: NOT_IMPLEMENTED,
    ':userName': {
        get: userViewController,
        put: NOT_IMPLEMENTED,
        patch: NOT_IMPLEMENTED,
        delete: NOT_IMPLEMENTED,
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        },
        permission: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
