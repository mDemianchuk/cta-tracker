import {TrainStop} from "../models/train-stop";

export class TrainStopMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (this.isValidStop(json)) {
            trainStop = new TrainStop(json['stop_id'], json['map_id'], json['station_name']);
        }
        return trainStop;
    }

    private static isValidStop(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('map_id')
            && json.hasOwnProperty('stop_name');
    }
}