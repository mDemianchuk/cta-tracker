import {FetchHelper} from "../utils/fetch-helper";
import {TrainStation} from "../models/train-station";
import {TrainStop} from "../models/train-stop";
import {TrainStationMapper} from "../mappers/train-station-mapper";
import {TrainStopMapper} from "../mappers/train-stop-mapper";

export class TrainDataClient {
    private readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL('https://data.cityofchicago.org/resource/8pix-ypme.json');
    }

    async getStations(routeShortId: string): Promise<TrainStation[]> {
        let stations: TrainStation[] = [];
        let trainJson: object[] = await this.getTrainData();
        trainJson.forEach(json => {
            if (this.isValidRoute(json, routeShortId)) {
                let station = TrainStationMapper.map(json);
                if (station) {
                    stations.push(station);
                }
            }
        });
        return new Promise(resolve => resolve(stations));
    }

    async getStops(routeShortId: string, stationId: string): Promise<TrainStop[]> {
        let stops: TrainStop[] = [];
        let trainJson: object[] = await this.getTrainData();
        trainJson.forEach((json: { [key: string]: any }) => {
            if (this.isValidStation(json, routeShortId, stationId)) {
                let stop = TrainStopMapper.map(json);
                if (stop) {
                    stops.push(stop);
                }
            }
        });
        return new Promise(resolve => resolve(stops));
    }

    private async getTrainData(): Promise<object[]> {
        return FetchHelper.fetch<object[]>(this.baseUrl);
    }

    private isValidRoute(json: { [key: string]: any }, routeShortId: string): boolean {
        return json.hasOwnProperty(routeShortId)
            && json[routeShortId] === true;
    }

    private isValidStation(json: { [key: string]: any }, routeShortId: string, stationId: string): boolean {
        return this.isValidRoute(json, routeShortId)
            && json.hasOwnProperty('map_id')
            && json['map_id'] === stationId;
    }
}