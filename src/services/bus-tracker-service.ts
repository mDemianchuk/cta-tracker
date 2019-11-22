import {BusTrackerClient} from "../clients/bus-tracker-client";
import {Route} from "../models/route";
import {RouteMapper} from "../mappers/route-mapper";
import {Prediction} from "../models/prediction";
import {PredictionMapper} from "../mappers/prediction-mapper";
import {Direction} from "../models/direction";
import {DirectionMapper} from "../mappers/direction-mapper";
import {Stop} from "../models/stop";
import {StopMapper} from "../mappers/stop-mapper";

export class BusTrackerService {
    private readonly client: BusTrackerClient;

    constructor() {
        this.client = new BusTrackerClient();
    }

    async getRoutes(): Promise<Route[]> {
        return this.client.getRotues()
            .then((routesJson: object[]) => {
                return routesJson.map(RouteMapper.map)
                    .filter((route: Route | undefined) => route) as Route[];
            });
    }

    async getDirections(routeId: string): Promise<Direction[]> {
        return this.client.getDirections(routeId)
            .then((directionsJson: object[]) => {
                return directionsJson.map(DirectionMapper.map)
                    .filter((direction: Direction | undefined) => direction) as Direction[];
            });
    }

    async getStops(routeId: string, direction: string): Promise<Stop[]> {
        return this.client.getStops(routeId, direction)
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