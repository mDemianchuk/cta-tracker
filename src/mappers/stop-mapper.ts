import {Stop} from "../models/stop";

export class StopMapper {
    static map(json: { [key: string]: any }): Stop | undefined {
        let station;
        if (StopMapper.isValid(json)) {
            station = new Stop(json['id'], json['name']);
        }
        return station;
    }

    private static isValid(json: { [key: string]: any }) {
        return json.hasOwnProperty('id')
            && json.hasOwnProperty('name');
    }
}