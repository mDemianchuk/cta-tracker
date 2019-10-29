import {CtaMapper} from "../cta-mapper";
import {TrainPrediction} from "../../models/train/train-prediction";

export class TrainPredictionMapper implements CtaMapper<TrainPrediction> {

    map(json: { [key: string]: any }): TrainPrediction | undefined {
        let prediction;
        if (this.isValid(json)) {
            prediction = new TrainPrediction(
                json['staNm'],
                json['stpDe'],
                json['destNm'],
                json['prdt'],
                json['arrT']
            );
        }
        return prediction;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('staNm')
            && json.hasOwnProperty('stpDe')
            && json.hasOwnProperty('destNm')
            && json.hasOwnProperty('prdt')
            && json.hasOwnProperty('arrT');
    }
}