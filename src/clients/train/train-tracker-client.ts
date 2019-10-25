import {ApiKeyProvider} from "../../utils/api-key-provider";
import {ApiType} from "../../models/api-type";
import {FetchHelper} from "../../utils/fetch-helper";
import {TrainDataClient} from "./train-data-client";
import {TrainStop} from "../../models/train/train-stop";
import {TrainStation} from "../../models/train/train-station";
import {TrainRoute} from "../../models/train/train-route";
import {TrainRouteProvider} from "../../utils/train-route-provider";
import {TrainPrediction} from "../../models/train/train-prediction";
import {TrainPredictionMapper} from "../../mappers/train/train-prediction-mapper";
import {ResponseProcessor} from "../../utils/response-processor";

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

    async getPredictionsForStation(routeId: string, stationId: string): Promise<TrainPrediction[]> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('mapid', stationId);
        return this.getPredictions(url);
    }

    async getPredictionsForStop(routeId: string, stopId: string): Promise<TrainPrediction[]> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stpid', stopId);
        return this.getPredictions(url);
    }

    private async getPredictions(url: URL) {
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new TrainPredictionMapper(), 'ctatt', 'eta')
            });
    }
}