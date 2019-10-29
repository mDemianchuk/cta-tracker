import {TrainRoute} from "./train-route";

export class TrainPrediction {
    private readonly _stationName: string;
    private readonly _stopDescription: string;
    private readonly _destination: string;
    private readonly _generatedAt: string;
    private readonly _approachingAt: string;
    private _route: TrainRoute;

    constructor(stationName: string, stopDescription: string, destination: string, generatedAt: string, approachingAt: string) {
        this._stationName = stationName;
        this._stopDescription = stopDescription;
        this._destination = destination;
        this._generatedAt = generatedAt;
        this._approachingAt = approachingAt;
    }

    get stationName(): string {
        return this._stationName;
    }

    get stopDescription(): string {
        return this._stopDescription;
    }

    get destination(): string {
        return this._destination;
    }

    get generatedAt(): string {
        return this._generatedAt;
    }

    get approachingAt(): string {
        return this._approachingAt;
    }

    get route(): TrainRoute {
        return this._route;
    }

    set route(value: TrainRoute) {
        this._route = value;
    }
}