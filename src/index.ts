import * as ons from 'onsenui';
import {BusTrackerView} from "./view/bus-tracker-view";
import {TrainTrackerView} from "./view/train-tracker-view";
import {PageHelper} from "./utils/page-helper";

let busTrackerView: BusTrackerView;
let trainTrackerView: TrainTrackerView;

ons.ready(async () => {
    initViews();
    initEventListeners();
    await renderMainPage();
});

function initViews(): void {
    trainTrackerView = new TrainTrackerView();
    busTrackerView = new BusTrackerView();
}

function initEventListeners(): void {
    document.addEventListener('init', async event => {
        const page = event.target as ons.OnsPageElement;
        PageHelper.addSpinner(page);

        if (!page.matches('#main-page')) {
            // render page content
            if (page.matches('#train-route')) {
                await initTrainRoutes();
            } else if (page.matches('#bus-route')) {
                await initBusRoutes();
            } else if (page.data && page.data.pageId) {
                const pageId: string = page.data.pageId;
                if (pageId === 'bus-stop') {
                    await initBusStops(page);
                } else if (pageId === 'train-station') {
                    await initTrainStations(page);
                } else if (pageId === 'bus-prediction') {
                    await initBusPredictions(page);
                } else if(pageId === 'train-prediction') {

                }
            }
        }
        PageHelper.removeSpinner(page);
    });
}

async function initTrainRoutes(): Promise<void> {
    return trainTrackerView.renderRoutes();
}

async function initBusRoutes(): Promise<void> {
    return busTrackerView.renderRoutes();
}

async function initBusStops(page: ons.OnsPageElement): Promise<void> {
    return busTrackerView.renderStops(page);
}

async function initTrainStations(page: ons.OnsPageElement): Promise<void> {
    return trainTrackerView.renderStations(page);
}

async function initBusPredictions(page: ons.OnsPageElement): Promise<void> {
    return busTrackerView.renderPredictions(page);
}

function renderMainPage(): Promise<HTMLElement> {
    return PageHelper.pushPage('templates/main.html', '#main-navigator');
}