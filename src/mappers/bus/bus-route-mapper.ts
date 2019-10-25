import {BusRoute} from "../../models/bus/bus-route";

export class BusRouteMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): BusRoute | undefined {
        let route;
        if (BusRouteMapper.isValidRoute(json)) {
            route = new BusRoute(json['rt'], json['rtnm']);
        }
        return route;
    }

    private static isValidRoute(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('rt')
            && json.hasOwnProperty('rtnm');
    }
}