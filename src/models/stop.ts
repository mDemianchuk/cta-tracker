export class Stop {
    readonly id: string;
    readonly name: string;
    routeId: string | null;
    oppositeDirectionStopId: string | null;

    constructor(id: string, name: string, oppositeDirectionStopId: string | null) {
        this.id = id;
        this.name = name;
        this.oppositeDirectionStopId = oppositeDirectionStopId;
    }
}