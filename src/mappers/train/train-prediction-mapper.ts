import {TrainPrediction} from "../../models/train/train-prediction";

export class TrainPredictionMapper {
    private constructor() {
    }

    static map(json: { [key: string]: any }): TrainPrediction | undefined {
        let prediction;
        if (TrainPredictionMapper.isValidPrediction(json)) {
            let isApproaching: boolean = json['isApp'] === '1';
            let isDelayed: boolean = json['isDly'] === '1';
            let routeId: string = (json['rt'] as string).toLowerCase();
            prediction = new TrainPrediction(
                json['staNm'],
                json['stpDe'],
                routeId,
                json['destNm'],
                json['prdt'],
                json['arrT'],
                isApproaching,
                isDelayed
            );
        }
        return prediction;
    }

    private static isValidPrediction(json: { [key: string]: any }): boolean {
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