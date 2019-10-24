import {ApiKeyProvider} from "../utils/api-key-provider";
import {ApiType} from "../models/api-type";
import {FetchHelper} from "../utils/fetch-helper";
import {Direction} from "../models/direction";

export class BusTrackerClient {
    private readonly apiKey: string;
    private readonly baseUrl: URL;

    constructor() {
        this.apiKey = ApiKeyProvider.getApiKey(ApiType.BUS);
        this.baseUrl = new URL('http://www.ctabustracker.com/bustime/api/v2/');
    }

    async getRoutes(): Promise<object> {
        const url = new URL('getroutes', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        return FetchHelper.fetch(url);
    }

    async getDirections(route: string): Promise<object> {
        const url = new URL('getdirections', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', route);
        return FetchHelper.fetch(url);
    }

    async getStops(route: string, direction: Direction): Promise<object> {
        const url = new URL('getstops', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', route);
        url.searchParams.set('dir', direction);
        return FetchHelper.fetch(url);
    }

    async getPredictions(route: string, stopId: string): Promise<object> {
        const url = new URL('getpredictions', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', route);
        url.searchParams.set('stpid', stopId);
        return FetchHelper.fetch(url);
    }
}