export class FavoriteStop {
    readonly id: string;
    readonly stopName: string;
    readonly routeId: string;
    readonly routeName: string;

    constructor(id: string, stopName: string, routeId: string, routeName: string) {
        this.id = id;
        this.stopName = stopName;
        this.routeId = routeId;
        this.routeName = routeName;
    }
}