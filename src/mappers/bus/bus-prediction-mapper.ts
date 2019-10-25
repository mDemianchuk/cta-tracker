import {BusPrediction} from "../../models/bus/bus-prediction";

export class BusPredictionMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): BusPrediction | undefined {
        let prediction;
        if (BusPredictionMapper.isValidPrediction(json)) {
            prediction = new BusPrediction(
                json['tmstmp'],
                json['typ'],
                json['stpnm'],
                json['stpid'],
                json['vid'],
                json['rt'],
                json['rtdir'],
                json['des'],
                json['prdtm']
            );
        }
        return prediction;
    }

    private static isValidPrediction(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('tmstmp')
            && json.hasOwnProperty('typ')
            && json.hasOwnProperty('stpnm')
            && json.hasOwnProperty('stpid')
            && json.hasOwnProperty('vid')
            && json.hasOwnProperty('rt')
            && json.hasOwnProperty('rtdir')
            && json.hasOwnProperty('des')
            && json.hasOwnProperty('prdtm');
    }
}