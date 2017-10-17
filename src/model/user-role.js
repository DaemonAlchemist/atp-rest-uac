/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';

export default class UserRole extends Entity
{
    constructor() {
        super('auth', 'atpauth_user_role_view', []);
    }
}

export class UserRoleBase extends Entity {
    constructor() {
        super('auth', 'atpauth_user_role', []);
    }
}
