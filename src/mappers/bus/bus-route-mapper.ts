import {BusRoute} from "../../models/bus/bus-route";
import {CtaMapper} from "../cta-mapper";

export class BusRouteMapper implements CtaMapper<BusRoute> {

    map(json: { [key: string]: any }): BusRoute | undefined {
        let route;
        if (this.isValid(json)) {
            route = new BusRoute(json['rt'], json['rtnm']);
        }
        return route;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('rt')
            && json.hasOwnProperty('rtnm');
    }
}