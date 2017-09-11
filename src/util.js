/**
 * Created by Andrea on 9/5/2017.
 */

import jwt from 'jsonwebtoken';
import config from 'atp-config';

config.setDefaults({
    auth: {
        login: {
            token: {
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

export const createLoginToken = (req, user) => jwt.sign({}, this.secretKey, {
    algorithm: config.get('uac.jwt.algorithm'),
    expiresIn: config.get('uac.jwt.expiresIn'),
    notBefore: Date.now(),
    audience: config.get('uac.jwt.audience')(req),
    issuer: config.get('uac.jwt.issuer')(req),
    jwtid: "" + user.id,
    subject: user.username
});
