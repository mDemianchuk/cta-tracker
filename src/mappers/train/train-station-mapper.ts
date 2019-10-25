import {TrainStation} from "../../models/train/train-station";
import {TrainRouteProvider} from "../../utils/train-route-provider";
import {CtaMapper} from "../cta-mapper";

export class TrainStationMapper implements CtaMapper<TrainStation> {

    map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (this.isValid(json)) {
            let routeShortIds = TrainRouteProvider.getRouteShortIds(json);
            trainStation = new TrainStation(json['map_id'], json['station_name'], routeShortIds);
        }
        return trainStation;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}