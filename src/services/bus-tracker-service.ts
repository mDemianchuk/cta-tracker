import {BusTrackerClient} from "../clients/bus/bus-tracker-client";
import {BusRoute} from "../models/bus/bus-route";
import {BusDirection} from "../models/bus/bus-direction";
import {BusStop} from "../models/bus/bus-stop";
import {BusPrediction} from "../models/bus/bus-prediction";

export class BusTrackerService {
    private readonly client: BusTrackerClient;

    constructor() {
        this.client = new BusTrackerClient();
    }

    async getRoutes(): Promise<BusRoute[]> {
        return this.client.getRoutes();
    }

    async getDirections(route: BusRoute): Promise<BusDirection[]> {
        return this.client.getDirections(route.id);
    }

    async getStops(route: BusRoute, direction: BusDirection): Promise<BusStop[]> {
        return this.client.getStops(route.id, direction.name)
            .then((stops: BusStop[]) => {
                stops.forEach((stop: BusStop) => {
                    stop.route = route;
                    stop.direction = direction;
                });
                return stops;
            });
    }

    async getPredictions(stop: BusStop): Promise<BusPrediction[]> {
        return this.client.getPredictions(stop.route.id, stop.id)
            .then((predictions: BusPrediction[]) => {
                predictions.forEach((prediction: BusPrediction) => {
                    prediction.stop = stop;
                });
                return predictions;
            });
    }
}