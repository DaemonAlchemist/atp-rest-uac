/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';

export default class Role extends Entity
{
    constructor() {
        super('auth', 'atpauth_role', []);
    }
}
