import {Prediction} from "../models/prediction";

export class PredictionMapper {
    static map(json: { [key: string]: any }): Prediction | undefined {
        let prediction;
        if (PredictionMapper.isValid(json)) {
            prediction = new Prediction(
                json['vehicleId'],
                json['stopId'],
                json['stopName'],
                json['routeId'],
                json['direction'],
                json['destination'],
                json['arrivalTime'],
                json['predictionTime'],
                json['oppositeDirectionStopId']
            );
        }
        return prediction;
    }

    private static isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('vehicleId')
            && json.hasOwnProperty('stopId')
            && json.hasOwnProperty('stopName')
            && json.hasOwnProperty('routeId')
            && json.hasOwnProperty('direction')
            && json.hasOwnProperty('destination')
            && json.hasOwnProperty('arrivalTime')
            && json.hasOwnProperty('predictionTime')
            && json.hasOwnProperty('oppositeDirectionStopId');
    }
}