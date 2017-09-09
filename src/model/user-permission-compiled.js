/**
 * Created by Andrea on 9/5/2017.
 */

import {Entity} from 'atp-active-record';

export default class UserPermissionCompiled extends Entity
{
    constructor() {
        super('auth', 'atpauth_user_permission_compiled');
    }

    forUser(userId) {
        return new Promise((resolve, reject) => {
            this.where('user_id', userId)
                .list()
                .then(
                    rows => resolve(rows.map(row => row.permissionName)),
                    reject
                );
        });
    }
}
