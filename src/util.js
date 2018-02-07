/**
 * Created by Andrea on 9/5/2017.
 */

import jwt from 'jsonwebtoken';
import config from 'atp-config';
import Promise from 'promise';
import User from "./model/user";
import ApiKey from './model/key';

import {o} from "atp-sugar";
import {_, prop} from 'atp-pointfree';

config.setDefaults({
    auth: {
        login: {
            token: {
                expiresIn: "2 days",
                algorithm: 'HS256',
                audience: req => req.headers.host,
                issuer: req => req.headers.host,
                secretKey: "df34r3tg4h93rg8j24r29u4fnunrf928nr894nf8943n389nf2n4",
                allowedIn: {
                    headers: true,
                    cookie: true,
                    query: true,
                    body: false
                }
            },
        },
        apiKey: {
            allowedIn: {
                headers: true,
                cookie: true,
                query: true,
                body: false
            }
        }
    }
});

const getApiKey = request => {
    const allowedIn = config.get('auth.apiKey.allowedIn');
    const check = (location, name) =>
        allowedIn[location]
        && typeof request[location] !== 'undefined'
        && typeof request[location][name] !== 'undefined'
            ? request[location][name]
            : false;
    return check('headers', 'api-key') ||
           check('cookie',  'apiKey' ) ||
           check('body',    'apiKey' ) ||
           check('query',   'apiKey' );
};

const getLoginToken = request => {
    const allowedIn = config.get('auth.login.token.allowedIn');
    const check = (location, name) =>
        allowedIn[location]
        && typeof request[location] !== 'undefined'
        && typeof request[location][name] !== 'undefined'
            ? request[location][name]
            : false;
    return check('headers', 'login-token') ||
           check('cookie',  'loginToken' ) ||
           check('body',    'loginToken' ) ||
           check('query',   'loginToken' );
};

const getCredentials = request =>
    getApiKey(request)     ? {type: 'apiKey', key: getApiKey(request)      } :
    getLoginToken(request) ? {type: 'token',  token: getLoginToken(request)} :
                             {type: 'INVALID'};

export const isLoggedIn = request => new Promise((resolve, reject) => {
    try {
        const credentials = getCredentials(request);
        switch(credentials.type) {
            case 'apiKey':
                loggedInUser(request).then(resolve, reject);
                break;
            case 'token':
                parseLoginToken(credentials.token, request).then(resolve, () => {reject();});
                break;
            default:
                reject();
        }

    } catch(e) {
        reject();
    }
});

export const loggedInUser = request => new Promise((resolve, reject) => {
    const credentials = getCredentials(request);

    const getUser = id => new User().getById(id).then(resolve, reject);

    switch(credentials.type) {
        case 'apiKey':
            new ApiKey().getByIndex('apikey', credentials.key).then(_(getUser, prop('userId')))
            break;
        case 'token':
            parseLoginToken(credentials.token, request).then(_(getUser, prop('jti')));
    }
});

export const createLoginToken = (req, user, options = {}) => jwt.sign({}, config.get('auth.login.token.secretKey'), o({
    algorithm: config.get('auth.login.token.algorithm'),
    expiresIn: config.get('auth.login.token.expiresIn'),
    notBefore: 0,
    audience: config.get('auth.login.token.audience')(req),
    issuer: config.get('auth.login.token.issuer')(req),
    jwtid: "" + user.id, //type coercion because jsonwebtoken module requires id to be a string
}).merge(options).raw);

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

export const createCrudPermissions = (module, model) =>
    ['create', 'view', 'update', 'delete'].reduce(
        (combined, action) => combined.merge({
            [action]: [module, model, action].join('.')
        }),
        o({})
    ).raw;
