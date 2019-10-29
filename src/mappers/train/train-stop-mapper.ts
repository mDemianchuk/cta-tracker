import {TrainStop} from "../../models/train/train-stop";
import {TrainRouteProvider} from "../../utils/train-route-provider";
import {CtaMapper} from "../cta-mapper";
import {TrainRoute} from "../../models/train/train-route";

export class TrainStopMapper implements CtaMapper<TrainStop> {

    map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (this.isValid(json)) {
            let routes: TrainRoute[] = TrainRouteProvider.getRouteIds()
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteProvider.getRoute(routeShortId))
                .filter((route: TrainRoute | undefined) => route)
                .map((route: TrainRoute) => route);
            trainStop = new TrainStop(json['stop_id'], json['stop_name'], json['map_id'], routes);
        }
        return trainStop;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('stop_name')
            && json.hasOwnProperty('map_id')
            && TrainRouteProvider.containsRoutes(json);
    }
}