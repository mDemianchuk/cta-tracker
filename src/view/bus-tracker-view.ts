import * as ons from "onsenui";
import {BusTrackerService} from "../services/bus-tracker-service";
import {Route} from "../models/route";
import {PageHelper} from "../utils/page-helper";
import {Direction} from "../models/direction";
import {Stop} from "../models/stop";
import {Prediction} from "../models/prediction";

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
                    const listItem = PageHelper.createRouteListElement(route, async () => {
                        await PageHelper.pushPage(
                            'html/stop.html',
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
            PageHelper.addToolbarTitle(page, routeName);

            return this.service.getDirections(routeId)
                .then((directions: Direction[]) => {

                    const directionToDisplay: string = directions[directionId].direction;

                    return this.service.getStops(routeId, directionToDisplay)
                        .then((stops: Stop[]) => {

                            // init list header
                            PageHelper.addListHeader(page, directionToDisplay);

                            // add toggle button
                            if (directions.length > 1) {
                                const toggleButton = PageHelper.createToggleFab(async () => {
                                    await PageHelper.replacePage(
                                        'html/stop.html',
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
                            const stopList = page.querySelector('ons-list') as ons.OnsListItemElement;
                            stops.forEach((stop: Stop) => {
                                const listItem = PageHelper.createStopListElement(stop.name, async () => {
                                    await PageHelper.pushPage(
                                        'html/prediction.html',
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
            return Promise.reject('One or more attributes of the page data is missing');
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
            PageHelper.addToolbarTitle(page, stopName);

            // add toggle button
            if (oppositeDirectionStopId) {
                const toggleButton = PageHelper.createToggleFab(async () => {
                    await PageHelper.replacePage(
                        'html/prediction.html',
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
                        PageHelper.addListHeader(page, directionToDisplay);

                        // render predictions
                        const predictionList = page.querySelector('ons-list') as ons.OnsListItemElement;
                        predictions.forEach((prediction: Prediction) => {
                            const listItem: ons.OnsListItemElement = PageHelper.createPredictionListElement(prediction, routeName, 'fa-bus');
                            predictionList.appendChild(listItem);
                        });
                    } else {
                        // display a corresponding message
                    }
                });
        } else {
            return Promise.reject('One or more attributes of the page data is missing');
        }
    }
}