import {BusTrackerService} from "../services/bus-tracker-service";
import {TrainTrackerService} from "../services/train-tracker-service";
import {FirebaseService} from "../services/firebase-service";
import * as ons from "onsenui";
import {FavoriteStop} from "../models/favorite-stop";
import {PageHelper} from "../utils/page-helper";

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

    public static renderStops(stops: FavoriteStop[]): void {
        const listElement = document.querySelector('#favorite-stop-list') as Element;
        listElement.innerHTML = PageHelper.createFavoriteStopList(stops);
    }
}