import * as ons from "onsenui";
import {TrainTrackerService} from "../services/train-tracker-service";
import {Route} from "../models/route";
import {Station} from "../models/station";
import {PageHelper} from "../utils/page-helper";
import {Prediction} from "../models/prediction";
import {Stop} from "../models/stop";
import {TimeHelper} from "../utils/time-helper";

export class TrainTrackerView {
    private readonly service: TrainTrackerService;

    constructor() {
        this.service = new TrainTrackerService();
    }

    async renderRoutes(): Promise<void> {
        return this.service.getRoutes()
            .then((routes: Route[]) => {
                const routeList = document.querySelector('#train-route-list') as ons.OnsListItemElement;

                // render routes
                routes.forEach((route: Route) => {
                    const listItem = PageHelper.createRouteListElement(route, async () => {
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
            PageHelper.addToolbarTitle(page, routeName);

            return this.service.getStations(routeId)
                .then((stations: Station[]) => {

                    const stationList = page.querySelector('ons-list') as ons.OnsListItemElement;

                    // render stations
                    stations.forEach((station: Station) => {
                        const listItem = ons.createElement(`
                            <ons-list-item tappable modifier="longdivider chevron">
                                ${station.name}
                            </ons-list-item>
                        `) as ons.OnsListItemElement;
                        listItem.addEventListener('click', async () => {
                            await PageHelper.pushPage(
                                'templates/prediction.html',
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
                });
        } else {
            return Promise.reject('No routeId provided');
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
                                'templates/prediction.html',
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
                                    const timeToDisplay: string = TimeHelper.getDisplayTime(prediction.arrivalTime);
                                    const thumbnail = PageHelper.createThumbnail(timeToDisplay) as ons.OnsPageElement;
                                    const listItem = ons.createElement(`
                                        <ons-list-item modifier="longdivider">
                                            <div class="left"></div>
                                            <div class="center">
                                              <span class="list-item__title">${routeName}</span>
                                              <span class="list-item__subtitle">to ${prediction.destination}</span>
                                            </div>
                                            <div class="right">
                                                <ons-icon icon="fa-subway" style="padding-right: 5px"></ons-icon>
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
                });
        } else {
            return Promise.reject('No routeId or stopId provided');
        }
    }
}