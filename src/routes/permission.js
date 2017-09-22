/**
 * Created by Andy on 8/25/2017.
 */

import {basicCollectionController, NOT_IMPLEMENTED} from 'atp-rest';
import Permission from "../model/permission";

export default {
    get: basicCollectionController(Permission, 'auth.permission.view'),
    post: NOT_IMPLEMENTED,
    ':permissionId': {
        get: NOT_IMPLEMENTED,
        delete: NOT_IMPLEMENTED,
        role: {
            get: NOT_IMPLEMENTED,
            post: NOT_IMPLEMENTED,
            delete: NOT_IMPLEMENTED
        }
    }
};
