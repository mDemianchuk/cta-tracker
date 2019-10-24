import {ApiKeyProvider} from "../utils/api-key-provider";
import {ApiType} from "../models/api-type";
import {FetchHelper} from "../utils/fetch-helper";
import {TrainDataClient} from "./train-data-client";
import {TrainStop} from "../models/train-stop";
import {TrainStation} from "../models/train-station";
import {TrainRoute} from "../models/train-route";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainTrackerClient {
    private readonly apiKey: string;
    private readonly baseUrl: URL;
    private readonly trainDataClient: TrainDataClient;

    constructor() {
        this.apiKey = ApiKeyProvider.getApiKey(ApiType.TRAIN);
        this.baseUrl = new URL('http://lapi.transitchicago.com/api/1.0/');
        this.trainDataClient = new TrainDataClient();
    }

    async getRoutes(): Promise<TrainRoute[]> {
        let routes = TrainRouteProvider.getRoutes();
        return new Promise(resolve => resolve(routes));
    }

    async getStations(routeShortId: string): Promise<TrainStation[]> {
        return this.trainDataClient.getStations(routeShortId);
    }

    async getStops(routeShortId: string, stationId: string): Promise<TrainStop[]> {
        return this.trainDataClient.getStops(routeShortId, stationId);
    }

    async getPredictionsForStation(routeId: string, stationId: string): Promise<object> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('mapid', stationId);
        return FetchHelper.fetch(url);
    }

    async getPredictionsForStop(routeId: string, stopId: string): Promise<object> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stpid', stopId);
        return FetchHelper.fetch(url);
    }
}