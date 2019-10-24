export class TrainStop {
    private readonly _id: string;
    private readonly _stationId: string;
    private readonly _name: string;

    constructor(id: string, stationId: string, name: string) {
        this._id = id;
        this._stationId = stationId;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get stationId(): string {
        return this._stationId;
    }

    get name(): string {
        return this._name;
    }
}