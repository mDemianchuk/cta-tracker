import {TrainTrackerClient} from "../clients/train/train-tracker-client";
import {TrainRoute} from "../models/train/train-route";
import {TrainStation} from "../models/train/train-station";
import {TrainStop} from "../models/train/train-stop";
import {TrainPrediction} from "../models/train/train-prediction";

export class TrainTrackerService {
    private readonly client: TrainTrackerClient;

    constructor() {
        this.client = new TrainTrackerClient();
    }

    async getRoutes(): Promise<TrainRoute[]> {
        return this.client.getRoutes();
    }

    async getStations(route: TrainRoute): Promise<TrainStation[]> {
        return this.client.getStations(route.id);
    }

    async getStops(route: TrainRoute, station: TrainStation): Promise<TrainStop[]> {
        return this.client.getStops(route.shortId, station.id)
            .then((stops: TrainStop[]) => {
                stops.forEach((stop: TrainStop) => {
                    if (stop.stationId === station.id) {
                        stop.station = station;
                    }
                });
                return stops;
            });
    }

    async getPredictionsForStation(route: TrainRoute, station: TrainStation): Promise<TrainPrediction[]> {
        return this.client.getPredictionsForStation(route.id, station.id)
            .then((predictions: TrainPrediction[]) => {
                predictions.forEach((prediction: TrainPrediction) => {
                    prediction.route = route;
                });
                return predictions;
            });
    }

    async getPredictionsForStop(route: TrainRoute, stop: TrainStop): Promise<TrainPrediction[]> {
        return this.client.getPredictionsForStop(route.id, stop.id)
            .then((predictions: TrainPrediction[]) => {
                predictions.forEach((prediction: TrainPrediction) => {
                    prediction.route = route;
                });
                return predictions;
            });
    }
}