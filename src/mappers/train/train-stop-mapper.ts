import {TrainStop} from "../../models/train/train-stop";
import {TrainRouteProvider} from "../../utils/train-route-provider";
import {CtaMapper} from "../cta-mapper";

export class TrainStopMapper implements CtaMapper<TrainStop> {

    map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (this.isValid(json)) {
            let routeShortIds = TrainRouteProvider.getRouteShortIds(json);
            trainStop = new TrainStop(json['stop_id'], json['map_id'], json['station_name'], routeShortIds);
        }
        return trainStop;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('map_id')
            && json.hasOwnProperty('stop_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}