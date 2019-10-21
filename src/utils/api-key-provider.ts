import { config } from 'dotenv';
import { ApiType } from './api-type';

export class ApiKeyProvider {
    
    private constructor() {}
    
    public static getApiKey(apiType : ApiType) : string | undefined {
        config();
        return process.env[apiType];
    }
}