/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';
import hash from 'password-hash';

export default class User extends Entity
{
    constructor() {
        super('auth', 'atpauth_user', ['user_name']);
    }

    getByUserName(userName) {
        return this.getByIndex('user_name', userName);
    }

    hashPassword(password) {
        return hash.generate(password);
    }
}
