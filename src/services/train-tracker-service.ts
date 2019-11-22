import {TrainTrackerClient} from "../clients/train-tracker-client";
import {Route} from "../models/route";
import {RouteMapper} from "../mappers/route-mapper";
import {Prediction} from "../models/prediction";
import {PredictionMapper} from "../mappers/prediction-mapper";
import {Station} from "../models/station";
import {StationMapper} from "../mappers/station-mapper";
import {Stop} from "../models/stop";
import {StopMapper} from "../mappers/stop-mapper";

export class TrainTrackerService {
    private readonly client: TrainTrackerClient;

    constructor() {
        this.client = new TrainTrackerClient();
    }

    async getRoutes(): Promise<Route[]> {
        return this.client.getRotues()
            .then((routesJson: object[]) => {
                return routesJson.map(RouteMapper.map)
                    .filter((route: Route | undefined) => route) as Route[];
            });
    }

    async getStations(routeId: string): Promise<Station[]> {
        return this.client.getStations(routeId)
            .then((stationsJson: object[]) => {
                return stationsJson.map((stationJson: object) => {
                    let station: Station | undefined = StationMapper.map(stationJson);
                    if (station) {
                        station.routeId = routeId;
                    }
                    return station;
                }).filter((station: Station | undefined) => station) as Station[];
            });
    }

    async getStops(routeId: string, stationId: string): Promise<Stop[]> {
        return this.client.getStops(routeId, stationId)
            .then((stopsJson: object[]) => {
                return stopsJson.map((stopJson: object) => {
                    let stop: Stop | undefined = StopMapper.map(stopJson);
                    if (stop) {
                        stop.routeId = routeId;
                    }
                    return stop;
                }).filter((stop: Stop | undefined) => stop) as Stop[];
            });
    }

    async getPredictions(routeId: string, stopId: string): Promise<Prediction[]> {
        return this.client.getPredictions(routeId, stopId)
            .then((predictionsJson: object[]) => {
                return predictionsJson.map(PredictionMapper.map)
                    .filter((prediction: Prediction | undefined) => prediction) as Prediction[];
            });
    }
}