import {ApiKeyProvider} from "../utils/api-key-provider";
import {ApiType} from "../models/api-type";
import {FetchHelper} from "../utils/fetch-helper";
import {TrainDataClient} from "./train-data-client";

export class TrainTrackerClient {
    readonly apiKey: string;
    readonly baseUrl: URL;
    readonly trainDataClient: TrainDataClient;

    constructor() {
        this.apiKey = ApiKeyProvider.getApiKey(ApiType.TRAIN);
        this.baseUrl = new URL('http://lapi.transitchicago.com/api/1.0/');
        this.trainDataClient = new TrainDataClient();
    }

    async getRoutes(): Promise<object> {
        let routes = {
            routes: [
                'Red Line',
                'Blue Line',
                'Brown Line',
                'Green Line',
                'Orange Line',
                'Purple Line',
                'Pink Line',
                'Yellow Line'
            ]
        };
        return new Promise(resolve => resolve(routes));
    }

    async getStations(route: string): Promise<object> {
        return this.trainDataClient.getStations(route);
    }

    async getStops(route: string, stationId: string): Promise<object> {
        return this.trainDataClient.getStops(route, stationId);
    }

    async getPredictionsForStation(route: string, stationId: string): Promise<object> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', route);
        url.searchParams.set('mapid', stationId);
        return FetchHelper.fetch(url);
    }

    async getPredictionsForStop(route: string, stopId: string): Promise<object> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', route);
        url.searchParams.set('stpid', stopId);
        return FetchHelper.fetch(url);
    }
}