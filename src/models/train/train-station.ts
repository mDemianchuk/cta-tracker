import {TrainRoute} from "./train-route";

export class TrainStation {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _routes: TrainRoute[];

    constructor(id: string, name: string, routes: TrainRoute[]) {
        this._id = id;
        this._name = name;
        this._routes = routes;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get routes(): TrainRoute[] {
        return this._routes;
    }
}