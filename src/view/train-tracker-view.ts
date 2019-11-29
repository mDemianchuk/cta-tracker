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
        return this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList = document.querySelector('#train-route-list') as ons.OnsListItemElement;
                routes.forEach((route: Route) => {
                    const thumbnail = PageHelper.createThumbnail(route.id) as ons.OnsPageElement;
                    const listItem = ons.createElement(`
                        <ons-list-item tappable modifier="longdivider chevron">
                          <div class="left"></div>
                          <div class="center">${route.name}</div>
                        </ons-list-item>
                    `) as ons.OnsListItemElement;
                    listItem.querySelector('.left')!.appendChild(thumbnail);
                    listItem.addEventListener('click', async () => {
                        await PageHelper.pushPage(
                            'templates/stop.html',
                            '#train-navigator',
                            {
                                data: {
                                    pageId: 'train-station',
                                    routeId: route.id,
                                    routeName: route.name
                                }
                            }
                        );
                    });
                    routeList.appendChild(listItem);
                });
            });
    }

    async renderStations(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId && page.data.routeName) {
            const routeId: string = page.data.routeId;
            const routeName: string = page.data.routeName;

            // init title
            const toolbarCenter = page.querySelector('ons-toolbar .center') as ons.OnsToolbarElement;
            const toolbarTitle = ons.createElement(`
                        <span>${routeName} Stations</span>
                    `) as ons.OnsToolbarElement;
            toolbarCenter.appendChild(toolbarTitle);

            return this.service.getStations(routeId)
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
        } else {
            return Promise.reject('No routeId provided');
        }
    }
}