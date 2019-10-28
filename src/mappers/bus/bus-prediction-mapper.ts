import {BusPrediction} from "../../models/bus/bus-prediction";
import {CtaMapper} from "../cta-mapper";

export class BusPredictionMapper implements CtaMapper<BusPrediction> {

    map(json: { [key: string]: any }): BusPrediction | undefined {
        let prediction;
        if (this.isValid(json)) {
            prediction = new BusPrediction(
                json['vid'],
                json['des'],
                json['prdtm'],
                json['tmstmp']
            );
        }
        return prediction;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('vid')
            && json.hasOwnProperty('des')
            && json.hasOwnProperty('prdtm')
            && json.hasOwnProperty('tmstmp');
    }
}