import {Station} from "../models/station";

export class StationMapper {
    static map(json: { [key: string]: any }): Station | undefined {
        let station;
        if (StationMapper.isValid(json)) {
            station = new Station(json['id'], json['name']);
        }
        return station;
    }

    private static isValid(json: { [key: string]: any }) {
        return json.hasOwnProperty('id')
            && json.hasOwnProperty('name');
    }
}