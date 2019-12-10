import * as ons from 'onsenui';
import {BusTrackerView} from "./view/bus-tracker-view";
import {TrainTrackerView} from "./view/train-tracker-view";
import {PageHelper} from "./utils/page-helper";
import {FirebaseService} from "./services/firebase-service";
import {FavoriteStopView} from "./view/favorite-stop-view";
import {SignInView} from "./view/sign-in-view";

let firebaseService: FirebaseService;
let signInView: SignInView;
let busTrackerView: BusTrackerView;
let trainTrackerView: TrainTrackerView;
let favoriteStopView: FavoriteStopView;

ons.ready(async () => {
    if (ons.platform.isIPhoneX()) {
        initIPhoneXView();
    }
    initEventListeners();
    await renderMainPage()
        .then(() => initViews())
        .then(() => initTabbarEventListeners());
});

function initIPhoneXView() {
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
}

function renderMainPage(): Promise<HTMLElement> {
    return PageHelper.pushPage('html/main.html', '#main-navigator');
}

function initViews(): void {
    firebaseService = new FirebaseService();
    signInView = new SignInView(firebaseService);
    trainTrackerView = new TrainTrackerView(firebaseService);
    busTrackerView = new BusTrackerView(firebaseService);
    favoriteStopView = new FavoriteStopView(firebaseService);
}

function initEventListeners(): void {
    document.addEventListener('init', async event => {
        const page = event.target as ons.OnsPageElement;
        PageHelper.addSpinner(page);

        // render page content
        if (page.matches('#sign-in')) {
            await signInView.init();
        } else if (page.matches('#sign-up')) {
            // initSignUp();
        } else if (page.matches('#train-route')) {
            await trainTrackerView.initRoutes();
        } else if (page.matches('#bus-route')) {
            await busTrackerView.initRoutes();
        } else if (page.matches('#favorite-stop')) {
            await favoriteStopView.init();
        } else if (page.data && page.data.pageId) {
            const pageId: string = page.data.pageId;
            if (pageId === 'bus-stop') {
                await busTrackerView.initStops(page);
            } else if (pageId === 'train-station') {
                await trainTrackerView.initStations(page);
            } else if (pageId === 'bus-prediction') {
                await busTrackerView.initPredictions(page);
            } else if (pageId === 'train-prediction') {
                await trainTrackerView.initPredictions(page);
            } else if (pageId === 'favorite-prediction') {
                await favoriteStopView.initPrediction(page);
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