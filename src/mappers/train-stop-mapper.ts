import {TrainStop} from "../models/train-stop";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainStopMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (TrainStopMapper.isValidStop(json)) {
            let routeShortIds = TrainRouteProvider.getRouteShortIds(json);
            trainStop = new TrainStop(json['stop_id'], json['map_id'], json['station_name'], routeShortIds);
        }
        return trainStop;
    }

    private static isValidStop(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('map_id')
            && json.hasOwnProperty('stop_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}