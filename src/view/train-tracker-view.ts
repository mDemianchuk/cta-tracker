import * as ons from "onsenui";
import {TrainTrackerService} from "../services/train-tracker-service";
import {Route} from "../models/route";
import {Station} from "../models/station";
import {PageHelper} from "../utils/page-helper";
import {Prediction} from "../models/prediction";
import {Stop} from "../models/stop";
import {FirebaseService} from "../services/firebase-service";

export class TrainTrackerView {
    private readonly service: TrainTrackerService;
    private readonly firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.service = new TrainTrackerService();
        this.firebaseService = firebaseService;
    }

    async renderRoutes(): Promise<void> {
        return this.service.getRoutes()
            .then((routes: Route[]) => {
                if (routes.length > 1) {
                    const routeList = document.querySelector('#train-route-list') as ons.OnsListItemElement;

                    // render routes
                    routes.forEach((route: Route) => {
                        const listItem = PageHelper.createRouteListElement(route, async () => {
                            await PageHelper.pushPage(
                                'html/stop.html',
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
                } else {
                    const currentPage = document.querySelector('#train-route') as ons.OnsPageElement;
                    PageHelper.addEmptyListMessage(currentPage, 'train routes');
                }
            });
    }

    async renderStations(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId && page.data.routeName) {
            const routeId: string = page.data.routeId;
            const routeName: string = page.data.routeName;

            // init title
            PageHelper.addToolbarTitle(page, routeName);

            return this.service.getStations(routeId)
                .then((stations: Station[]) => {
                    if (stations.length > 1) {
                        const stationList = page.querySelector('ons-list') as ons.OnsListItemElement;

                        // render stations
                        stations.forEach((station: Station) => {
                            const listItem = PageHelper.createStopListElement(station.name, async () => {
                                await PageHelper.pushPage(
                                    'html/prediction.html',
                                    '#train-navigator',
                                    {
                                        data: {
                                            pageId: 'train-prediction',
                                            routeId: routeId,
                                            routeName: routeName,
                                            stationName: station.name,
                                            stationId: station.id,
                                            stopToDisplayId: 0
                                        }
                                    }
                                );
                            });
                            stationList.appendChild(listItem);
                        });
                    } else {
                        PageHelper.addEmptyListMessage(page, 'train stations');
                    }
                });
        } else {
            return Promise.reject('One or more attributes of the page data is missing');
        }
    }

    renderPredictions(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.routeId && page.data.routeName && page.data.stationName && page.data.stationId && page.data.stopToDisplayId !== undefined) {
            const routeId: string = page.data.routeId;
            const routeName: string = page.data.routeName;
            const stationName: string = page.data.stationName;
            const stationId: string = page.data.stationId;
            const stopToDisplayId: number = page.data.stopToDisplayId;
            const oppositeDirectionStopToDisplayId: number = Math.abs(stopToDisplayId - 1);

            // init title
            PageHelper.addToolbarTitle(page, stationName);

            return this.service.getStops(routeId, stationId)
                .then((stops: Stop[]) => {

                    const stopToDisplay: Stop = stops[stopToDisplayId];

                    // add toggle button
                    if (stopToDisplay.oppositeDirectionStopId) {
                        const toggleButton = PageHelper.createToggleFab(async () => {
                            await PageHelper.replacePage(
                                'html/prediction.html',
                                '#train-navigator',
                                {
                                    data: {
                                        pageId: 'train-prediction',
                                        routeId: routeId,
                                        routeName: routeName,
                                        stationName: stationName,
                                        stationId: stationId,
                                        stopToDisplayId: oppositeDirectionStopToDisplayId
                                    }
                                }
                            );
                        });
                        page.appendChild(toggleButton);
                    }

                    return this.service.getPredictions(routeId, stopToDisplay.id)
                        .then((predictions: Prediction[]) => {
                            if (predictions.length > 0) {
                                // init stop list header
                                const directionToDisplay: string = predictions[0].direction;
                                PageHelper.addListHeader(page, directionToDisplay);

                                // render predictions
                                const predictionList = page.querySelector('ons-list') as ons.OnsListItemElement;
                                predictions.forEach((prediction: Prediction) => {
                                    const listItem: ons.OnsListItemElement = PageHelper.createPredictionListElement(prediction, routeName, 'fa-subway');
                                    predictionList.appendChild(listItem);
                                });
                            } else {
                                PageHelper.addEmptyListMessage(page, 'arrival times');
                            }
                            PageHelper.addPredictionTime(page);
                        });
                });
        } else {
            return Promise.reject('One or more attributes of the page data is missing');
        }
    }
}