import {BusDirection} from "../../models/bus/bus-direction";
import {CtaMapper} from "../cta-mapper";

export class BusDirectionMapper implements CtaMapper<BusDirection> {

    map(json: { [key: string]: any }): BusDirection | undefined {
        let direction;
        if (this.isValid(json)) {
            direction = new BusDirection(json['dir']);
        }
        return direction;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('dir');
    }
}