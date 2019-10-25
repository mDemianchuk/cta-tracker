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
            .then((response: { [key: string]: any }) => {
                let routes: BusRoute[] = [];
                if (response.hasOwnProperty('bustime-response')) {
                    let bustimeResponse: { [key: string]: any } = response['bustime-response'];
                    if (bustimeResponse.hasOwnProperty('routes')) {
                        let routesJson: object[] = bustimeResponse['routes'];
                        routesJson.forEach(routeJson => {
                            let route = BusRouteMapper.map(routeJson);
                            if (route) {
                                routes.push(route);
                            }
                        });
                    }
                }
                return routes;
            });
    }

    async getDirections(routeId: string): Promise<BusDirection[]> {
        const url = new URL('getdirections', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        return FetchHelper.fetch(url)
            .then((response: { [key: string]: any }) => {
                let directions: BusDirection[] = [];
                if (response.hasOwnProperty('bustime-response')) {
                    let bustimeResponse: { [key: string]: any } = response['bustime-response'];
                    if (bustimeResponse.hasOwnProperty('directions')) {
                        let directionsJson: object[] = bustimeResponse['directions'];
                        directionsJson.forEach(directionJson => {
                            let direction = BusDirectionMapper.map(directionJson);
                            if (direction) {
                                directions.push(direction);
                            }
                        });
                    }
                }
                return directions;
            });
    }

    async getStops(routeId: string, direction: string): Promise<BusStop[]> {
        const url = new URL('getstops', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('dir', direction);
        return FetchHelper.fetch(url)
            .then((response: { [key: string]: any }) => {
                let stops: BusStop[] = [];
                if (response.hasOwnProperty('bustime-response')) {
                    let bustimeResponse: { [key: string]: any } = response['bustime-response'];
                    if (bustimeResponse.hasOwnProperty('stops')) {
                        let stopsJson: object[] = bustimeResponse['stops'];
                        stopsJson.forEach(stopJson => {
                            let stop = BusStopMapper.map(stopJson);
                            if (stop) {
                                stops.push(stop);
                            }
                        });
                    }
                }
                return stops;
            });
    }

    async getPredictions(routeId: string, stopId: string): Promise<BusPrediction[]> {
        const url = new URL('getpredictions', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stpid', stopId);
        return FetchHelper.fetch(url)
            .then((response: { [key: string]: any }) => {
                let predictions: BusPrediction[] = [];
                if (response.hasOwnProperty('bustime-response')) {
                    let bustimeResponse: { [key: string]: any } = response['bustime-response'];
                    if (bustimeResponse.hasOwnProperty('prd')) {
                        let predictionsJson: object[] = bustimeResponse['prd'];
                        predictionsJson.forEach(predictionJson => {
                            let prediction = BusPredictionMapper.map(predictionJson);
                            if (prediction) {
                                predictions.push(prediction);
                            }
                        });
                    }
                }
                return predictions;
            });
    }
}