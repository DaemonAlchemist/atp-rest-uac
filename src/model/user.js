/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';
import hash from 'password-hash';

export default class User extends Entity
{
    constructor() {
        super('auth', 'atpauth_user', ['userName']);
    }

    getByUserName(userName) {
        return this.getByIndex('userName', userName);
    }

    hashPassword(password) {
        return hash.generate(password);
    }

    verifyPassword(password, user) {
        return hash.verify(password, user.passwordHash);
    }
}
