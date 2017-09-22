/**
 * Created by Andrea on 9/5/2017.
 */

import jwt from 'jsonwebtoken';
import config from 'atp-config';
import Promise from 'promise';
import {o} from 'atp-sugar';

config.setDefaults({
    auth: {
        login: {
            token: {
                expiresIn: '15m',
                algorithm: 'HS256',
                audience: req => req.headers.host,
                issuer: req => req.headers.host,
                secretKey: "df34r3tg4h93rg8j24r29u4fnunrf928nr894nf8943n389nf2n4",
                allowedIn: {
                    header: true,
                    cookie: true,
                    query: false,
                    body: false
                }
            }
        }
    }
});

export const isLoggedIn = request => new Promise((resolve, reject) => {
    const allowedIn = config.get('auth.login.token.allowedIn');
    const check = (allowed, value) => allowed && typeof value !== 'undefined' ? value : false;
    parseLoginToken(
        check(allowedIn.header, request.headers.logintoken) ||
        check(allowedIn.cookie, request.cookie.loginToken ) ||
        check(allowedIn.body,   request.body.loginToken   ) ||
        check(allowedIn.query,  request.query.loginToken  ),
    request).then(
        resolve,
        () => {reject();}
    );
});

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
    jwtid: "" + user.id, //type coercion because jsonwebtoken module requires id to be a string
    subject: user.username
});

export const parseLoginToken = (token, req) => new Promise((resolve, reject) => {
    const tokenConfig = config.get('auth.login.token');
    !token
        ? reject(new Error("No login token"))
        : jwt.verify(token, tokenConfig.secretKey, {
            algorithm: tokenConfig.algorithm,
            audience: tokenConfig.audience(req),
            issuer: tokenConfig.issuer(req),
        }, (err, payload) => {
            err ? reject(err) : resolve(payload);
        });
});
