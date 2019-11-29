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
    // on page initialization
    document.addEventListener('init', async event => {
        const page = event.target as ons.OnsPageElement;
        PageHelper.addSpinner(page);

        const toolbar = PageHelper.getTabToolbarByPage(page);
        const toolbarTitle = toolbar.querySelector('.center') as ons.OnsToolbarElement;

        if (page.data && page.data.title) {
            toolbarTitle.innerHTML = page.data.title;
        }

        if (!page.matches('#main-page')) {
            const toolbarLeft = toolbar.querySelector('.left') as ons.OnsToolbarElement;
            const backButton = ons.createElement(`
                <ons-back-button></ons-back-button>
            `) as ons.OnsBackButtonElement;
            toolbarLeft.appendChild(backButton);
        }

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
            }
        }
        PageHelper.removeSpinner(page);
    });

    // // on tab change
    // document.addEventListener('prechange', event => {
    //     const nextTabIndex = PageHelper.getNextTabIndex();
    //     const mainToolbar = PageHelper.getMainToolbar();
    //     const nextTabToolbar = PageHelper.getTabToolbarByIndex(nextTabIndex);
    //     mainToolbar.innerHTML = nextTabToolbar.innerHTML;
    //     //copy event listeners too
    // });
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

function renderMainPage(): Promise<HTMLElement> {
    return PageHelper.pushPage('templates/main.html', '#main-navigator', {data: {title: 'Routes'}});
}