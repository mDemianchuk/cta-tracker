import {TrainStation} from "../../models/train/train-station";
import {TrainRouteProvider} from "../../utils/train-route-provider";

export class TrainStationMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (TrainStationMapper.isValidStation(json)) {
            let routeShortIds = TrainRouteProvider.getRouteShortIds(json);
            trainStation = new TrainStation(json['map_id'], json['station_name'], routeShortIds);
        }
        return trainStation;
    }

    private static isValidStation(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}