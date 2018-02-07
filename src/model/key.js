
import {Entity} from 'atp-active-record';

export default class ApiKey extends Entity
{
    constructor() {
        super('auth', 'atpauth_api_key');
    }
}
