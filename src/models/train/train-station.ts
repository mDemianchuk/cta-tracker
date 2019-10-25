export class TrainStation {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _routeShortIds: string[];

    constructor(id: string, name: string, routeShortIds: string[]) {
        this._id = id;
        this._name = name;
        this._routeShortIds = routeShortIds;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get routeShortIds(): string[] {
        return this._routeShortIds;
    }
}