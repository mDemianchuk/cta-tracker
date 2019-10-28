import {BusDirection} from "./bus-direction";
import {BusRoute} from "./bus-route";

export class BusStop {
    private readonly _id: string;
    private readonly _name: string;
    private _route: BusRoute;
    private _direction: BusDirection;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get route(): BusRoute {
        return this._route;
    }

    set route(value: BusRoute) {
        this._route = value;
    }

    get direction(): BusDirection {
        return this._direction;
    }

    set direction(value: BusDirection) {
        this._direction = value;
    }
}