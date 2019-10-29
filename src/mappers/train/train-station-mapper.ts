import {TrainStation} from "../../models/train/train-station";
import {TrainRouteProvider} from "../../utils/train-route-provider";
import {CtaMapper} from "../cta-mapper";
import {TrainRoute} from "../../models/train/train-route";

export class TrainStationMapper implements CtaMapper<TrainStation> {

    map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (this.isValid(json)) {
            let routes: TrainRoute[] = TrainRouteProvider.getRouteIds()
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteProvider.getRoute(routeShortId))
                .filter((route: TrainRoute | undefined) => route)
                .map((route: TrainRoute) => route);
            trainStation = new TrainStation(json['map_id'], json['station_name'], routes);
        }
        return trainStation;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}