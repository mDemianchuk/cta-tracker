import {FetchHelper} from "../../utils/fetch-helper";
import {TrainStation} from "../../models/train/train-station";
import {TrainStop} from "../../models/train/train-stop";
import {TrainStationMapper} from "../../mappers/train/train-station-mapper";
import {TrainStopMapper} from "../../mappers/train/train-stop-mapper";

export class TrainDataClient {
    private readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL('https://data.cityofchicago.org/resource/8pix-ypme.json');
    }

    async getStations(routeShortId: string): Promise<TrainStation[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let stationMap: Map<string, TrainStation> = new Map();
                let mapper: TrainStationMapper = new TrainStationMapper();
                response.map((json: { [key: string]: string }) => mapper.map(json))
                    .filter((station: TrainStation | undefined) => station && this.isValidRoute(station, routeShortId))
                    .forEach((station: TrainStation) => stationMap.set(station.id, station));
                return Array.from(stationMap.values());
            });
    }

    async getStops(routeShortId: string, stationId: string): Promise<TrainStop[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let mapper: TrainStopMapper = new TrainStopMapper();
                return response.map((json: { [key: string]: string }) => mapper.map(json))
                    .filter((stop: TrainStop | undefined) => stop && this.isValidStation(stop, routeShortId, stationId))
                    .map((stop: TrainStop) => stop);
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