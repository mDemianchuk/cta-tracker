export class FavoriteStop {
    readonly id: string;
    readonly stopName: string;
    readonly routeId: string;
    readonly direction: string;

    constructor(id: string, stopName: string, routeId: string, direction: string) {
        this.id = id;
        this.stopName = stopName;
        this.routeId = routeId;
        this.direction = direction;
    }
}