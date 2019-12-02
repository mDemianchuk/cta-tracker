import {BusTrackerService} from "../services/bus-tracker-service";
import {TrainTrackerService} from "../services/train-tracker-service";
import {FirebaseService} from "../services/firebase-service";
import {PageHelper} from "../utils/page-helper";

export class FavoriteStopsView {
    private readonly busTrackerService: BusTrackerService;
    private readonly trainTrackerService: TrainTrackerService;
    private readonly firebaseService: FirebaseService;

    constructor(firebaseService: FirebaseService) {
        this.busTrackerService = new BusTrackerService();
        this.trainTrackerService = new TrainTrackerService();
        this.firebaseService = firebaseService;
    }

    async renderFavoriteStops(): Promise<void> {
        if(!this.firebaseService.isUserSignedIn()) {
            await PageHelper.replacePage('html/sign-in.html', '#favorite-stop-navigator');
        }
        return Promise.resolve();
    }
}