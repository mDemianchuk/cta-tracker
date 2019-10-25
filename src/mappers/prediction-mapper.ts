import {Prediction} from "../models/prediction";

export class PredictionMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): Prediction | undefined {
        let prediction;
        if (PredictionMapper.isValidStation(json)) {
            let isApproaching: boolean = json['isApp'] === '1';
            let isDelayed: boolean = json['isDly'] === '1';
            prediction = new Prediction(
                json['staNm'],
                json['stpDe'],
                json['rt'],
                json['destNm'],
                json['prdt'],
                json['arrT'],
                isApproaching,
                isDelayed
            );
        }
        return prediction;
    }

    private static isValidStation(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('staNm')
            && json.hasOwnProperty('stpDe')
            && json.hasOwnProperty('rt')
            && json.hasOwnProperty('destNm')
            && json.hasOwnProperty('prdt')
            && json.hasOwnProperty('arrT')
            && json.hasOwnProperty('isApp')
            && json.hasOwnProperty('isDly');
    }
}