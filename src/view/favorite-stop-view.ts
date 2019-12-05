import {BusTrackerService} from "../services/bus-tracker-service";
import {TrainTrackerService} from "../services/train-tracker-service";
import {FirebaseService} from "../services/firebase-service";
import * as ons from "onsenui";

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
        // render fav stops
    }

    private initSignOut(): void {
        const signOutButton = document.querySelector('#sign-out-button') as ons.OnsButtonElement;
        signOutButton.addEventListener('click', async () => {
            await this.firebaseService.signOut();
        });
    }
}