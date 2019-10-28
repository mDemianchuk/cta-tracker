import {BusStop} from "./bus-stop";

export class BusPrediction {
    private readonly _vehicleId: string;
    private readonly _destination: string;
    private readonly _predictionTime: string;
    private readonly _generatedAt: string;
    private _stop: BusStop;

    constructor(vehicleId: string, destination: string, predictionTime: string, generatedAt: string) {
        this._vehicleId = vehicleId;
        this._destination = destination;
        this._predictionTime = predictionTime;
        this._generatedAt = generatedAt;
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    get destination(): string {
        return this._destination;
    }

    get predictionTime(): string {
        return this._predictionTime;
    }

    get generatedAt(): string {
        return this._generatedAt;
    }

    get stop(): BusStop {
        return this._stop;
    }

    set stop(value: BusStop) {
        this._stop = value;
    }
}