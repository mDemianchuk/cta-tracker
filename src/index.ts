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
            const toolbar = page.querySelector('ons-toolbar') as ons.OnsToolbarElement;
            const toolbarLeft = page.querySelector('.left') as ons.OnsToolbarElement;
            const toolbarTitle = toolbar.querySelector('.center') as ons.OnsToolbarElement;

            // change title
            if (page.data && page.data.title) {
                toolbarTitle.innerHTML = page.data.title;
            }

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
                }
            }

            // init search
            // const toolbarRight = toolbar.querySelector('.right') as ons.OnsToolbarElement;
            // const searchButton = toolbarRight.querySelector('.search') as ons.OnsToolbarElement;
            // if (toolbarRight && searchButton) {
            //     const searchBarContainer = ons.createElement(`
            //         <div style="
            //             margin: 0;
            //             position: absolute;
            //             top: 50%;
            //             left: 40%;
            //             transform: translate(-50%, -50%);">
            //         </div>
            //     `) as ons.OnsPageElement;
            //     const searchBar = ons.createElement(`
            //         <ons-search-input placeholder="Search" style="width: 130%"></ons-search-input>
            //     `) as ons.OnsSearchInputElement;
            //
            //     searchBarContainer.appendChild(searchBar);
            //
            //     searchButton.addEventListener('click', () => {
            //         toolbarLeft.style.display = 'none';
            //         toolbarTitle.style.display = 'none';
            //         toolbarRight.style.display = 'none';
            //         toolbar.appendChild(searchBar);
            //     });
            //
            //     // @ts-ignore
            //     searchBar.onchange(event => {
            //         toolbar.removeChild(searchBar);
            //         toolbarLeft.style.display = 'block';
            //         toolbarTitle.style.display = 'block';
            //         toolbarRight.style.display = 'block';
            //     });
            // }
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

function renderMainPage(): Promise<HTMLElement> {
    return PageHelper.pushPage('templates/main.html', '#main-navigator', {data: {title: 'Routes'}});
}