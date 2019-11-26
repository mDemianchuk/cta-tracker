import * as ons from "onsenui";
import {TrainTrackerService} from "../services/train-tracker-service";
import {Route} from "../models/route";
import {Station} from "../models/station";
import {PageHelper} from "../utils/page-helper";

export class TrainTrackerView {
    private readonly service: TrainTrackerService;

    constructor() {
        this.service = new TrainTrackerService();
    }

    async init(): Promise<void> {
        return this.fetchRoutes();
    }

    private async fetchRoutes(): Promise<void> {
        this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList: Element = document.querySelector('#train-route-list')!;
                routes.forEach((route: Route) => {
                    const listItem = ons.createElement(`
                    <ons-list-item tappable modifier="chevron" id="${route.id}">
                        ${route.name}
                    </ons-list-item>
                    `) as Node;
                    listItem.addEventListener('click', async () => {
                        await PageHelper.changePage('templates/train-station.html')
                            .then(() => PageHelper.updateTitle(route.name, '#train-station-title'))
                            .then(() => this.fetchStations(route.id));
                    });
                    routeList.appendChild(listItem);
                });
            });
    }

    private async fetchStations(routeId: string): Promise<void> {
        this.service.getStations(routeId)
            .then((stations: Station[]) => {
                const stationList: Element = document.querySelector('#train-station-list')!;
                stations.forEach((station: Station) => {
                    const listItem = ons.createElement(`
                    <ons-list-item tappable modifier="chevron" id="${station.id}">
                        ${station.name}
                    </ons-list-item>
                `) as Node;
                    stationList.appendChild(listItem);
                });
            });
    }
}