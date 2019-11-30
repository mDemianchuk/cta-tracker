import {Stop} from "../models/stop";

export class StopMapper {
    static map(json: { [key: string]: any }): Stop | undefined {
        let stop;
        if (StopMapper.isValid(json)) {
            stop = new Stop(json['id'], json['name'], json['oppositeDirectionStopId']);
        }
        return stop;
    }

    private static isValid(json: { [key: string]: any }) {
        return json.hasOwnProperty('id')
            && json.hasOwnProperty('name')
            && json.hasOwnProperty('oppositeDirectionStopId');
    }
}