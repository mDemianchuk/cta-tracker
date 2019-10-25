export class TrainRoute {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _shortId: string;

    constructor(id: string, name: string, shortId: string) {
        this._id = id;
        this._name = name;
        this._shortId = shortId;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get shortId(): string {
        return this._shortId;
    }
}