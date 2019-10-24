import {TrainStation} from "../models/train-station";

export class TrainStationMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (TrainStationMapper.isValidStation(json)) {
            trainStation = new TrainStation(json['map_id'], json['station_name']);
        }
        return trainStation;
    }

    private static isValidStation(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name');
    }
}