import {BusPrediction} from "../../models/bus/bus-prediction";
import {CtaMapper} from "../cta-mapper";

export class BusPredictionMapper implements CtaMapper<BusPrediction> {

    map(json: { [key: string]: any }): BusPrediction | undefined {
        let prediction;
        if (this.isValid(json)) {
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

    isValid(json: { [key: string]: any }): boolean {
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