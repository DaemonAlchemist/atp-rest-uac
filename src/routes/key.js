/**
 * Created by Andy on 8/25/2017.
 */

import ApiKey from "../model/key";
import {createCrudPermissions} from "../util";
import {o} from 'atp-sugar';
import {basicController, NOT_SUPPORTED} from 'atp-rest';
import randomstring from 'randomstring';

const permissions = createCrudPermissions('auth', 'key');
const model = ApiKey;
const idField = 'keyId';

export default o(basicController.entity.crud({model, permissions, idField})).as(key => o(key).merge({
    post: (req, res) => {
        req.body.apiKey = randomstring.generate(64);
        key.post(req, res);
    },
    [':' + idField]: {
        put: NOT_SUPPORTED,
        patch: NOT_SUPPORTED
    }
}).raw);
