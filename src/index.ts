import * as ons from 'onsenui';
import {BusTrackerView} from "./view/bus-tracker-view";
import {TrainTrackerView} from "./view/train-tracker-view";
import {PageHelper} from "./utils/page-helper";
import {FirebaseService} from "./services/firebase-service";
import {FavoriteStopsView} from "./view/favorite-stops-view";

let firebaseService: FirebaseService;
let busTrackerView: BusTrackerView;
let favoriteStopsView: FavoriteStopsView;
let trainTrackerView: TrainTrackerView;

ons.ready(async () => {
    if (ons.platform.isIPhoneX()) {
        initIPhoneXView();
    }
    initViews();
    initEventListeners();
    await renderMainPage()
        .then(() => initTabbarEventListeners());
});

function initViews(): void {
    firebaseService = new FirebaseService();
    trainTrackerView = new TrainTrackerView(firebaseService);
    busTrackerView = new BusTrackerView(firebaseService);
    favoriteStopsView = new FavoriteStopsView(firebaseService);
}

function initIPhoneXView() {
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
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
        } else if (page.matches('#favorite-stop')) {
            await initFavoriteStops();
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

function initTabbarEventListeners(): void {
    const tabbar = document.querySelector('ons-tabbar') as ons.OnsTabbarElement;
    tabbar.addEventListener('reactive', async (event: any) => {
        const navigator = PageHelper.getNavigatorByTabIndex(event.index) as ons.OnsNavigatorElement;
        while (navigator.pages.length > 1) {
            await navigator.popPage();
        }
    });
}

async function initTrainRoutes(): Promise<void> {
    return trainTrackerView.renderRoutes();
}

async function initBusRoutes(): Promise<void> {
    return busTrackerView.renderRoutes();
}

async function initFavoriteStops(): Promise<void> {
    return favoriteStopsView.renderFavoriteStops();
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