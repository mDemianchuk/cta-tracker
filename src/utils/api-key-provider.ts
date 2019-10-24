import {config} from 'dotenv';
import {ApiType} from '../models/api-type';

export class ApiKeyProvider {
    private constructor() {
    }

    static getApiKey(apiType: ApiType): string {
        config();
        return process.env[apiType] || '';
    }
}