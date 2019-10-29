import {TrainRoute} from "./train-route";
import {TrainStation} from "./train-station";

export class TrainStop {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _stationId: string;
    private readonly _routes: TrainRoute[];
    private _station: TrainStation;

    constructor(id: string, name: string, stationId: string, routes: TrainRoute[]) {
        this._id = id;
        this._name = name;
        this._stationId = stationId;
        this._routes = routes;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get stationId(): string {
        return this._stationId;
    }

    get routes(): TrainRoute[] {
        return this._routes;
    }

    get station(): TrainStation {
        return this._station;
    }

    set station(value: TrainStation) {
        this._station = value;
    }
}