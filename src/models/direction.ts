export class Direction {
    readonly direction: string;
    readonly routeId: string;

    constructor(direction: string, routeId: string) {
        this.direction = direction;
        this.routeId = routeId;
    }
}