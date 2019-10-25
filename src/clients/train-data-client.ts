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
        return this.getTrainData()
            .then((response: object[]) => {
                let stations: TrainStation[] = [];
                response.forEach(json => {
                    let station = TrainStationMapper.map(json);
                    if (station && this.isValidRoute(station, routeShortId)) {
                        stations.push(station);
                    }
                });
                return stations;
            });
    }

    async getStops(routeShortId: string, stationId: string): Promise<TrainStop[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let stops: TrainStop[] = [];
                response.forEach(json => {
                    let stop = TrainStopMapper.map(json);
                    if (stop && this.isValidStation(stop, routeShortId, stationId)) {
                        stops.push(stop);
                    }
                });
                return stops;
            });
    }

    private async getTrainData(): Promise<object[]> {
        return FetchHelper.fetch<object[]>(this.baseUrl);
    }

    private isValidRoute(station: TrainStation, routeShortId: string): boolean {
        return station.routeShortIds.includes(routeShortId);
    }

    private isValidStation(stop: TrainStop, routeShortId: string, stationId: string): boolean {
        return stop.routeShortIds.includes(routeShortId)
            && stop.stationId === stationId;
    }
}