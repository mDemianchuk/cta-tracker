export class Prediction {
    readonly vehicleId: string;
    readonly stopId: string;
    readonly stopName: string;
    readonly routeId: string;
    readonly direction: string;
    readonly destination: string;
    readonly arrivalTime: number;
    readonly predictionTime: number;
    readonly oppositeDirectionStopId: string | null;

    constructor(vehicleId: string, stopId: string, stopName: string, routeId: string, direction: string, destination: string, arrivalTime: number, predictionTime: number, oppositeDirectionStopId: string) {
        this.vehicleId = vehicleId;
        this.stopId = stopId;
        this.stopName = stopName;
        this.routeId = routeId;
        this.direction = direction;
        this.destination = destination;
        this.arrivalTime = arrivalTime;
        this.predictionTime = predictionTime;
        this.oppositeDirectionStopId = oppositeDirectionStopId;
    }
}
