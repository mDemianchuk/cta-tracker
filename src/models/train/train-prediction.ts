export class TrainPrediction {
    private readonly _stationName: string;
    private readonly _stopDescription: string;
    private readonly _routeId: string;
    private readonly _destination: string;
    private readonly _generatedAt: string;
    private readonly _approachingAt: string;
    private readonly _isApproaching: boolean;
    private readonly _isDelayed: boolean;

    constructor(stationName: string, stopDescription: string, routeId: string, destination: string, generatedAt: string, approachingAt: string, isApproaching: boolean, isDelayed: boolean) {
        this._stationName = stationName;
        this._stopDescription = stopDescription;
        this._routeId = routeId;
        this._destination = destination;
        this._generatedAt = generatedAt;
        this._approachingAt = approachingAt;
        this._isApproaching = isApproaching;
        this._isDelayed = isDelayed;
    }

    get stationName(): string {
        return this._stationName;
    }

    get stopDescription(): string {
        return this._stopDescription;
    }

    get routeId(): string {
        return this._routeId;
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

    get isApproaching(): boolean {
        return this._isApproaching;
    }

    get isDelayed(): boolean {
        return this._isDelayed;
    }
}