/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';
import config from 'atp-config';
import hash from 'password-hash';

config.setDefaults({
    uac: {
        jwt: {
            expiresIn: '15m',
            algorithm: 'HS256',
            audience: req => req.headers.host,
            issuer: req => req.headers.host,
        }
    }
});


export default class User extends Entity
{
    constructor() {
        super('auth', 'atpauth_user', ['user_name']);
        this.secretKey = "df34r3tg4h93rg8j24r29u4fnunrf928nr894nf8943n389nf2n4";
    }

    getByUserName(userName) {
        return this.getByIndex('user_name', userName);
    }

    hashPassword(password) {
        return hash.generate(password);
    }
}
