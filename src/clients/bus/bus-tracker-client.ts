import {ApiKeyProvider} from "../../utils/api-key-provider";
import {ApiType} from "../../models/api-type";
import {FetchHelper} from "../../utils/fetch-helper";
import {BusDirection} from "../../models/bus/bus-direction";
import {BusRouteMapper} from "../../mappers/bus/bus-route-mapper";
import {BusRoute} from "../../models/bus/bus-route";
import {BusDirectionMapper} from "../../mappers/bus/bus-direction-mapper";
import {BusStop} from "../../models/bus/bus-stop";
import {BusStopMapper} from "../../mappers/bus/bus-stop-mapper";
import {BusPrediction} from "../../models/bus/bus-prediction";
import {BusPredictionMapper} from "../../mappers/bus/bus-prediction-mapper";
import {ResponseProcessor} from "../../utils/response-processor";

export class BusTrackerClient {
    private readonly apiKey: string;
    private readonly baseUrl: URL;

    constructor() {
        this.apiKey = ApiKeyProvider.getApiKey(ApiType.BUS);
        this.baseUrl = new URL('http://www.ctabustracker.com/bustime/api/v2/');
    }

    async getRoutes(): Promise<BusRoute[]> {
        const url = new URL('getroutes', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new BusRouteMapper(), 'bustime-response', 'routes')
            });
    }

    async getDirections(routeId: string): Promise<BusDirection[]> {
        const url = new URL('getdirections', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new BusDirectionMapper(), 'bustime-response', 'directions')
            });
    }

    async getStops(routeId: string, direction: string): Promise<BusStop[]> {
        const url = new URL('getstops', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('dir', direction);
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new BusStopMapper(), 'bustime-response', 'stops')
            });
    }

    async getPredictions(routeId: string, stopId: string): Promise<BusPrediction[]> {
        const url = new URL('getpredictions', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stpid', stopId);
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new BusPredictionMapper(), 'bustime-response', 'prd')
            });
    }
}