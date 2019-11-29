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

    async renderRoutes(): Promise<void> {
        return this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList = document.querySelector('#bus-route-list') as ons.OnsListItemElement;
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
                            '#bus-navigator',
                            {
                                data: {
                                    pageId: 'bus-stop',
                                    routeId: route.id,
                                    directionId: 0
                                }
                            }
                        );
                    });
                    routeList.appendChild(listItem);
                });
            });
    }

    async renderStops(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId && page.data.directionId !== undefined) {
            const routeId: string = page.data.routeId;
            const directionId: number = page.data.directionId;
            const oppositeDirectionId: number = Math.abs(directionId - 1);

            return this.service.getDirections(routeId)
                .then((directions: Direction[]) => {

                    // init title
                    const toolbarCenter = page.querySelector('ons-toolbar .center') as ons.OnsToolbarElement;
                    const toolbarTitle = ons.createElement(`
                        <span>Route ${routeId} Stops</span>
                    `) as ons.OnsToolbarElement;
                    toolbarCenter.appendChild(toolbarTitle);

                    // init stop list header
                    const directionToDisplay: string = directions[directionId].direction;
                    const stopList = page.querySelector('ons-list') as ons.OnsListItemElement;
                    const stopListHeader = ons.createElement(`
                        <ons-list-header>${directionToDisplay}</ons-list-header>
                    `) as ons.OnsListItemElement;
                    stopList.appendChild(stopListHeader);

                    // add toggle button
                    if (directions.length > 1) {
                        const toggleButton = ons.createElement(`
                            <ons-fab position="bottom right">
                                <ons-icon icon="fa-exchange"></ons-icon>
                            </ons-fab>
                        `) as ons.OnsToolbarButtonElement;
                        toggleButton.addEventListener('click', async () => {
                            await PageHelper.replacePage(
                                'templates/stop.html',
                                '#bus-navigator',
                                {
                                    data: {
                                        pageId: 'bus-stop',
                                        routeId: routeId,
                                        directionId: oppositeDirectionId
                                    }
                                }
                            );
                        });
                        page.appendChild(toggleButton);
                    }

                    // render stops
                    this.service.getStops(routeId, directionToDisplay)
                        .then((stops: Stop[]) => {
                            stops.forEach((stop: Stop) => {
                                const listItem = ons.createElement(`
                                    <ons-list-item tappable modifier="chevron">
                                        ${stop.name}
                                    </ons-list-item>
                                `) as ons.OnsListItemElement;
                                stopList.appendChild(listItem);
                            });
                        });
                });
        } else {
            return Promise.reject('No routeId or directionId provided');
        }
    }
}