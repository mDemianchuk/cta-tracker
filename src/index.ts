import * as ons from 'onsenui';
import {BusTrackerView} from "./view/bus-tracker-view";
import {TrainTrackerView} from "./view/train-tracker-view";

let busTrackerView: BusTrackerView;
let trainTrackerView: TrainTrackerView;

async function initViews(): Promise<void[]> {
    trainTrackerView = new TrainTrackerView();
    busTrackerView = new BusTrackerView();
    return Promise.all([trainTrackerView.init(), busTrackerView.init()]);
}

ons.ready(async () => {
    await initViews();
});