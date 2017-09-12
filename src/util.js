/**
 * Created by Andrea on 9/5/2017.
 */

import jwt from 'jsonwebtoken';
import config from 'atp-config';

config.setDefaults({
    auth: {
        login: {
            token: {
                expiresIn: '15m',
                algorithm: 'HS256',
                audience: req => req.headers.host,
                issuer: req => req.headers.host,
                secretKey: "df34r3tg4h93rg8j24r29u4fnunrf928nr894nf8943n389nf2n4",
                allowed: {
                    header: true,
                    cookie: true
                }
            }
        }
    }
});

export const isLoggedIn = request => {
    //TODO:  implement
    return true;
};

export const loggedInUser = request => {
    //TODO:  implement
    return {id: 123};
};

export const createLoginToken = (req, user) => jwt.sign({}, config.get('auth.login.token.secretKey'), {
    algorithm: config.get('auth.login.token.algorithm'),
    expiresIn: config.get('auth.login.token.expiresIn'),
    notBefore: Date.now(),
    audience: config.get('auth.login.token.audience')(req),
    issuer: config.get('auth.login.token.issuer')(req),
    jwtid: "" + user.id,
    subject: user.username
});
