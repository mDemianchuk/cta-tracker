import * as ons from "onsenui";
import {BusTrackerService} from "../services/bus-tracker-service";
import {Route} from "../models/route";
import {PageHelper} from "../utils/page-helper";
import {Direction} from "../models/direction";
import {Stop} from "../models/stop";
import {Prediction} from "../models/prediction";
import {TimeHelper} from "../utils/time-helper";

export class BusTrackerView {
    private readonly service: BusTrackerService;

    constructor() {
        this.service = new BusTrackerService();
    }

    async renderRoutes(): Promise<void> {
        return this.service.getRoutes()
            .then((routes: Route[]) => {

                const routeList = document.querySelector('#bus-route-list') as ons.OnsListItemElement;

                // render routes
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
                                    routeName: route.name,
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
        if (page.data && page.data.routeId && page.data.routeName && page.data.directionId !== undefined) {
            const routeId: string = page.data.routeId;
            const routeName: string = page.data.routeName;
            const directionId: number = page.data.directionId;
            const oppositeDirectionId: number = Math.abs(directionId - 1);

            // init title
            const toolbarCenter = page.querySelector('ons-toolbar .center') as ons.OnsToolbarElement;
            const toolbarTitle = ons.createElement(`
                <span>${routeName}</span>
            `) as ons.OnsToolbarElement;
            toolbarCenter.appendChild(toolbarTitle);

            return this.service.getDirections(routeId)
                .then((directions: Direction[]) => {

                    const directionToDisplay: string = directions[directionId].direction;

                    return this.service.getStops(routeId, directionToDisplay)
                        .then((stops: Stop[]) => {

                            // init stop list header
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
                                                routeName: routeName,
                                                directionId: oppositeDirectionId
                                            }
                                        }
                                    );
                                });
                                page.appendChild(toggleButton);
                            }

                            // render stops
                            stops.forEach((stop: Stop) => {
                                const listItem = ons.createElement(`
                                    <ons-list-item tappable modifier="longdivider chevron">
                                        ${stop.name}
                                    </ons-list-item>
                                `) as ons.OnsListItemElement;
                                listItem.addEventListener('click', async () => {
                                    await PageHelper.pushPage(
                                        'templates/prediction.html',
                                        '#bus-navigator',
                                        {
                                            data: {
                                                pageId: 'bus-prediction',
                                                routeId: routeId,
                                                routeName: routeName,
                                                stopId: stop.id,
                                                stopName: stop.name,
                                                oppositeDirectionStopId: stop.oppositeDirectionStopId
                                            }
                                        }
                                    );
                                });
                                stopList.appendChild(listItem);
                            });
                        });
                });
        } else {
            return Promise.reject('No routeId or directionId provided');
        }
    }

    renderPredictions(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId && page.data.routeName && page.data.stopId && page.data.stopName) {
            const routeId: string = page.data.routeId;
            const routeName: string = page.data.routeName;
            const stopId: string = page.data.stopId;
            const stopName: string = page.data.stopName;
            const oppositeDirectionStopId: string | null = page.data.oppositeDirectionStopId;

            // init title
            const toolbarCenter = page.querySelector('ons-toolbar .center') as ons.OnsToolbarElement;
            const toolbarTitle = ons.createElement(`
                <span>${stopName}</span>
            `) as ons.OnsToolbarElement;
            toolbarCenter.appendChild(toolbarTitle);

            // add toggle button
            if (oppositeDirectionStopId) {
                const toggleButton = ons.createElement(`
                <ons-fab position="bottom right">
                    <ons-icon icon="fa-exchange"></ons-icon>
                </ons-fab>
            `) as ons.OnsToolbarButtonElement;
                toggleButton.addEventListener('click', async () => {
                    await PageHelper.replacePage(
                        'templates/prediction.html',
                        '#bus-navigator',
                        {
                            data: {
                                pageId: 'bus-prediction',
                                routeId: routeId,
                                routeName: routeName,
                                stopId: oppositeDirectionStopId,
                                stopName: stopName,
                                oppositeDirectionStopId: stopId
                            }
                        }
                    );
                });
                page.appendChild(toggleButton);
            }

            return this.service.getPredictions(routeId, stopId)
                .then((predictions: Prediction[]) => {
                    if (predictions.length > 0) {
                        // init stop list header
                        const directionToDisplay: string = predictions[0].direction;
                        const predictionList = page.querySelector('ons-list') as ons.OnsListItemElement;
                        const predictionListHeader = ons.createElement(`
                            <ons-list-header>${directionToDisplay}</ons-list-header>
                        `) as ons.OnsListItemElement;
                        predictionList.appendChild(predictionListHeader);

                        // render predictions
                        predictions.forEach((prediction: Prediction) => {
                            const timeToDisplay: string = PageHelper.getDisplayTime(prediction.arrivalTime);
                            const thumbnail = PageHelper.createThumbnail(timeToDisplay) as ons.OnsPageElement;
                            const listItem = ons.createElement(`
                                <ons-list-item modifier="longdivider">
                                    <div class="left"></div>
                                    <div class="center">
                                      <span class="list-item__title">${routeName}</span>
                                      <span class="list-item__subtitle">to ${prediction.destination}</span>
                                    </div>
                                    <div class="right">
                                        <ons-icon icon="fa-bus" style="padding-right: 5px"></ons-icon>
                                        ${prediction.vehicleId}
                                    </div>
                                </ons-list-item>
                            `) as ons.OnsListItemElement;
                            listItem.querySelector('.left')!.appendChild(thumbnail);
                            predictionList.appendChild(listItem);
                        });
                    } else {
                        // display a corresponding message
                    }
                });
        } else {
            return Promise.reject('No routeId or stopId provided');
        }
    }
}