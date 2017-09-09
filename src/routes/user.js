/**
 * Created by Andy on 8/25/2017.
 */

import userListController from '../controller/user/list';
import userViewController from '../controller/user/view';
import {NOT_IMPLEMENTED} from 'atp-rest';

export default {
    get: userListController,
    post: NOT_IMPLEMENTED,
    ':userName': {
        get: userViewController,
        put: NOT_IMPLEMENTED,
        patch: NOT_IMPLEMENTED,
        'delete': NOT_IMPLEMENTED,
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            'delete': NOT_IMPLEMENTED
        },
        permission: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            'delete': NOT_IMPLEMENTED
        }
    }
};
