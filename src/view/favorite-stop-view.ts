import {BusTrackerService} from "../services/bus-tracker-service";
import {TrainTrackerService} from "../services/train-tracker-service";
import {FirebaseService} from "../services/firebase-service";
import * as ons from "onsenui";
import {FavoriteStop} from "../models/favorite-stop";
import {PageHelper} from "../utils/page-helper";
import {Prediction} from "../models/prediction";

export class FavoriteStopView {
    private readonly busTrackerService: BusTrackerService;
    private readonly trainTrackerService: TrainTrackerService;
    private readonly firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.busTrackerService = new BusTrackerService();
        this.trainTrackerService = new TrainTrackerService();
        this.firebaseService = firebaseService;
    }

    async init(): Promise<void> {
        this.initSignOut();
    }

    private initSignOut(): void {
        const signOutButton = document.querySelector('#sign-out-button') as ons.OnsButtonElement;
        signOutButton.addEventListener('click', async () => {
            await this.firebaseService.signOut();
        });
    }

    public static renderStops(trainStops: FavoriteStop[], busStops: FavoriteStop[]): void {
        FavoriteStopView.cleanStopList();
        FavoriteStopView.cleanBottomBox();

        const page = document.querySelector('#favorite-stop') as ons.OnsPageElement;

        if (trainStops.length === 0 && busStops.length === 0) {
            PageHelper.addEmptyListMessage(page, 'favorite stops');
        } else {
            const list = document.querySelector('#favorite-stop-list') as Element;
            let listElements = PageHelper.createFavoriteListElements(trainStops, 'train');
            listElements = listElements.concat(PageHelper.createFavoriteListElements(busStops, 'bus'));
            listElements.forEach((item: Element) => list.appendChild(item));
        }
    }

    private static cleanStopList(): void {
        const list = document.querySelector('#favorite-stop-list') as Element;
        list.innerHTML = '';
    }

    private static cleanBottomBox(): void {
        const page = document.querySelector('#favorite-stop') as ons.OnsPageElement;
        const bottomBox = page.querySelector('.bottom-box') as Element;
        bottomBox.innerHTML = '';
    }

    async initPrediction(page: ons.OnsPageElement): Promise<void> {
        if (page.data && page.data.stopType && page.data.stop) {
            const stopType: string = page.data.stopType;
            const stop: FavoriteStop = page.data.stop;

            // init title
            PageHelper.addToolbarTitle(page, stop.stopName);
            PageHelper.addToolbarSubtitle(page, stop.direction);

            const isAlreadySaved: boolean = await this.firebaseService.isStopSaved(stop.id, stopType).catch(() => false);
            PageHelper.addSaveButton(page, isAlreadySaved, async () => {
                const isSaved: boolean = await this.firebaseService.isStopSaved(stop.id, stopType).catch(() => false);
                if (isSaved) {
                    // delete the stop
                    await this.firebaseService.deleteStop(stop.id, stopType)
                        .then(() => PageHelper.toggleSaveButtonIcon(page))
                        .catch(error => console.log(error));
                } else {
                    // save the stop
                    await this.firebaseService.saveStop(stop, stopType)
                        .then(() => PageHelper.toggleSaveButtonIcon(page))
                        .catch(error => console.log(error));
                }
            });

            let trackerService: BusTrackerService | TrainTrackerService;
            let icon: string;

            if (stopType === 'train') {
                trackerService = this.trainTrackerService;
                icon = 'ion-ios-subway, material:md-subway';
            } else {
                trackerService = this.busTrackerService;
                icon = 'ion-ios-bus, material:md-bus';
            }

            return await trackerService.getPredictions(stop.routeId, stop.id)
                .then((predictions: Prediction[]) => {
                    if (predictions.length > 0) {
                        const predictionList = page.querySelector('ons-list') as ons.OnsListItemElement;
                        predictions.forEach((prediction: Prediction) => {
                            const listItem: ons.OnsListItemElement = PageHelper.createPredictionListElement(prediction, prediction.stopName, icon);
                            predictionList.appendChild(listItem);
                        });
                    } else {
                        PageHelper.addEmptyListMessage(page, 'arrival times');
                    }
                    PageHelper.addTimeElement(page);
                });
        } else {
            return Promise.reject('One or more attributes of the page data is missing');
        }
    }
}