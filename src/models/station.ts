export class Station {
    readonly id: string;
    readonly name: string;
    routeId: string | null;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}