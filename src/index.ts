import * as ons from 'onsenui';
import {TrainTrackerService} from "./services/train-tracker-service";
import {BusTrackerService} from "./services/bus-tracker-service";
import {Route} from "./models/route";
import {Prediction} from "./models/prediction";

let trainService: TrainTrackerService;
let busService: BusTrackerService;

function init() {
    trainService = new TrainTrackerService();
    busService = new BusTrackerService();
}

async function changePage(service: BusTrackerService | TrainTrackerService, elementId: string) {
    const navigator = document.querySelector('#navigator') as ons.OnsNavigatorElement;
    await navigator.resetToPage('templates/bus-predictions.html')
        .then(() => service.getPredictions('9', '6066'))
        .then((predictions: Prediction[]) => {
            const predictionList: Element = document.querySelector(elementId)!;
            predictions.forEach((prediction: Prediction) => {
                predictionList.appendChild(ons.createElement(`
                    <ons-list-item>
                        ${prediction.arrivalTime} ${prediction.stopId}</ons-button>
                    </ons-list-item>
                `) as Node);
            });
        });
}

async function init_routes(service: BusTrackerService | TrainTrackerService, elementId: string) {
    await service.getRoutes()
        .then((routes: Route[]) => {
            const routeList: Element = document.querySelector(elementId)!;
            routes.forEach((route: Route) => {
                const listItem = ons.createElement(`
                    <ons-list-item id="${route.id}">
                        ${route.id} ${route.name}
                    </ons-list-item>
                `) as Node;
                // listItem.addEventListener('click', async () => await changePage(service, '#bus-prediction-list'));
                routeList.appendChild(listItem);
            });
        });
}

ons.ready(async () => {
    init();
    const promiseList: Promise<void>[] = [];
    promiseList.push(init_routes(trainService, '#train-route-list'));
    promiseList.push(init_routes(busService, '#bus-route-list'));
    await Promise.all(promiseList);
});