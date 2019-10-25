export class BusPrediction {
    private readonly _generatedAt: string;
    private readonly _type: string;
    private readonly _stopName: string;
    private readonly _stopId: string;
    private readonly _vehicleId: string;
    private readonly _routeId: string;
    private readonly _direction: string;
    private readonly _destination: string;
    private readonly _predictionTime: string;

    constructor(generatedAt: string, type: string, stopName: string, stopId: string, vehicleId: string, routeId: string, direction: string, destination: string, predictionTime: string) {
        this._generatedAt = generatedAt;
        this._type = type;
        this._stopName = stopName;
        this._stopId = stopId;
        this._vehicleId = vehicleId;
        this._routeId = routeId;
        this._direction = direction;
        this._destination = destination;
        this._predictionTime = predictionTime;
    }

    get generatedAt(): string {
        return this._generatedAt;
    }

    get type(): string {
        return this._type;
    }

    get stopName(): string {
        return this._stopName;
    }

    get stopId(): string {
        return this._stopId;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    get routeId(): string {
        return this._routeId;
    }

    get direction(): string {
        return this._direction;
    }

    get destination(): string {
        return this._destination;
    }

    get predictionTime(): string {
        return this._predictionTime;
    }
}