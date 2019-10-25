import {BusDirection} from "../../models/bus/bus-direction";

export class BusDirectionMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): BusDirection | undefined {
        let direction;
        if (BusDirectionMapper.isValidDirection(json)) {
            direction = new BusDirection(json['dir']);
        }
        return direction;
    }

    private static isValidDirection(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('dir');
    }
}