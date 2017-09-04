/**
 * Created by Andrea on 8/27/2017.
 */

import {Entity} from 'atp-active-record';
import jwt from 'jsonwebtoken';
import config from 'atp-config';

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
        super('user', 'atpadmin_users', ['user_name']);
        this.secretKey = "df34r3tg4h93rg8j24r29u4fnunrf928nr894nf8943n389nf2n4";
    }

    getByUserName(userName) {
        return this.getByIndex('user_name', userName);
    }

    createLoginToken(req, user) {
        return jwt.sign({}, this.secretKey, {
            algorithm: config.get('uac.jwt.algorithm'),
            expiresIn: config.get('uac.jwt.expiresIn'),
            notBefore: Date.now(),
            audience: config.get('uac.jwt.audience')(req),
            issuer: config.get('uac.jwt.issuer')(req),
            jwtid: "" + user.id,
            subject: user.username
        });
    }
}
