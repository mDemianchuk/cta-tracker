import {BusStop} from "../../models/bus/bus-stop";
import {CtaMapper} from "../cta-mapper";

export class BusStopMapper implements CtaMapper<BusStop> {

    map(json: { [key: string]: any }): BusStop | undefined {
        let route;
        if (this.isValid(json)) {
            route = new BusStop(json['stpid'], json['stpnm']);
        }
        return route;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stpid')
            && json.hasOwnProperty('stpnm');
    }
}