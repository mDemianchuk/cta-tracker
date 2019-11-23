import * as ons from "onsenui";
import {BusTrackerService} from "../services/bus-tracker-service";
import {Route} from "../models/route";
import {PageHelper} from "../utils/page-helper";
import {Direction} from "../models/direction";
import {Stop} from "../models/stop";

export class BusTrackerView {
    private readonly service: BusTrackerService;

    constructor() {
        this.service = new BusTrackerService();
    }

    async init(): Promise<void> {
        return this.fetchRoutes();
    }

    private async fetchRoutes(): Promise<void> {
        this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList: Element = document.querySelector('#bus-route-list')!;
                routes.forEach((route: Route) => {
                    const listItem = ons.createElement(`
                        <ons-list-item id="${route.id}">
                            ${route.name}
                        </ons-list-item>
                    `) as Node;
                    listItem.addEventListener('click', async () => {
                        await PageHelper.changePage('templates/bus-stop.html')
                            .then(() => this.fetchStops(route.id))
                    });
                    routeList.appendChild(listItem);
                });
            });
    }

    private async fetchStops(routeId: string): Promise<void> {
        this.service.getDirections(routeId)
            .then((directions: Direction[]) => {
                if (directions.length > 0) {
                    let direction: string = directions[0].direction;
                    const stopList: Element = document.querySelector('#bus-stop-list')!;
                    this.service.getStops(routeId, direction)
                        .then((stops: Stop[]) => {
                            stops.forEach((stop: Stop) => {
                                const listItem = ons.createElement(`
                                    <ons-list-item id="${stop.id}">
                                        ${stop.name}
                                    </ons-list-item>
                                `) as Node;
                                stopList.appendChild(listItem);
                            });
                        });
                }
            });
    }
}