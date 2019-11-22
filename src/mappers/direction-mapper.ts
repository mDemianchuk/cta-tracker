import {Direction} from "../models/direction";

export class DirectionMapper {
    static map(json: { [key: string]: any }): Direction | undefined {
        let direction;
        if (DirectionMapper.isValid(json)) {
            direction = new Direction(json['direction'], json['routeId']);
        }
        return direction;
    }

    private static isValid(json: { [key: string]: any }) {
        return json.hasOwnProperty('direction')
            && json.hasOwnProperty('routeId');
    }
}