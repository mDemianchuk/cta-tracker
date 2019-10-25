import {BusStop} from "../../models/bus/bus-stop";

export class BusStopMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any },): BusStop | undefined {
        let route;
        if (BusStopMapper.isValidStop(json)) {
            route = new BusStop(json['stpid'], json['stpnm'],);
        }
        return route;
    }

    private static isValidStop(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stpid')
            && json.hasOwnProperty('stpnm');
    }
}