import * as ons from 'onsenui';
import {BusTrackerView} from "./view/bus-tracker-view";
import {TrainTrackerView} from "./view/train-tracker-view";
import {PageHelper} from "./utils/page-helper";

let busTrackerView: BusTrackerView;
let trainTrackerView: TrainTrackerView;

function initTabbarEventListeners() {
    const tabbar = document.querySelector('ons-tabbar') as ons.OnsTabbarElement;
    tabbar.addEventListener('reactive', async (event: any) => {
        const navigator = PageHelper.getNavigatorByTabIndex(event.index) as ons.OnsNavigatorElement;
        while (navigator.pages.length > 1) {
            await navigator.popPage();
        }
    });
}

ons.ready(async () => {
    initViews();
    initEventListeners();
    await renderMainPage()
        .then(() => initTabbarEventListeners());
});

function initViews(): void {
    trainTrackerView = new TrainTrackerView();
    busTrackerView = new BusTrackerView();
}

function initEventListeners(): void {
    document.addEventListener('init', async event => {
        const page = event.target as ons.OnsPageElement;
        PageHelper.addSpinner(page);

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
            } else if (pageId === 'train-prediction') {
                await initTrainPredictions(page);
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

async function initTrainPredictions(page: ons.OnsPageElement): Promise<void> {
    return trainTrackerView.renderPredictions(page);
}

function renderMainPage(): Promise<HTMLElement> {
    return PageHelper.pushPage('html/main.html', '#main-navigator');
}