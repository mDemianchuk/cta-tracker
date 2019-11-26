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

    async renderRoutes(): Promise<void> {
        this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList = document.querySelector('#train-route-list') as ons.OnsListItemElement;
                routes.forEach((route: Route) => {
                    const listItem = ons.createElement(`
                        <ons-list-item tappable modifier="chevron">
                            ${route.name}
                        </ons-list-item>
                    `) as ons.OnsListItemElement;
                    listItem.addEventListener('click', async () => {
                        await PageHelper.pushPage(
                            'templates/stop.html',
                            '#train-navigator',
                            {
                                data: {
                                    title: route.name,
                                    pageId: 'train-station',
                                    routeId: route.id
                                }
                            }
                        );
                    });
                    routeList.appendChild(listItem);
                });
            });
    }

    async renderStations(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId) {
            const routeId: string = page.data.routeId;
            this.service.getStations(routeId)
                .then((stations: Station[]) => {
                    const stationList = page.querySelector('ons-list') as ons.OnsListItemElement;
                    stations.forEach((station: Station) => {
                        const listItem = ons.createElement(`
                            <ons-list-item tappable modifier="chevron">
                                ${station.name}
                            </ons-list-item>
                        `) as ons.OnsListItemElement;
                        stationList.appendChild(listItem);
                    });
                });
        }
    }
}