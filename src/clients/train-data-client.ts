import {FetchHelper} from "../utils/fetch-helper";

export class TrainDataClient {
    readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL('https://data.cityofchicago.org/resource/8pix-ypme.json');
    }

    public async getStations(route: string): Promise<object> {
        let stationJson: object[] = [];
        let trainJson: object[] = await this.getTrainData();
        trainJson.forEach((json: { [key: string]: any }) => {
            if (json.hasOwnProperty(route) && json[route] === true) {
                if (json.hasOwnProperty('map_id') && json.hasOwnProperty('station_name')) {
                    stationJson.push({
                        map_id: json['map_id'],
                        station_name: json['station_name']
                    });
                }
            }
        });
        return new Promise(resolve => resolve({stations: stationJson}));
    }

    public async getStops(route: string, stationId: string): Promise<object> {
        let stopJson: object[] = [];
        let trainJson: object[] = await this.getTrainData();
        trainJson.forEach((json: { [key: string]: any }) => {
            if (json.hasOwnProperty(route) && json[route] === true
                && json.hasOwnProperty('map_id') && json['map_id'] === stationId) {
                if (json.hasOwnProperty('stop_id') && json.hasOwnProperty('stop_name')) {
                    stopJson.push({
                        map_id: json['map_id'],
                        stop_id: json['stop_id'],
                        stop_name: json['stop_name']
                    });
                }
            }
        });
        return new Promise(resolve => resolve({stops: stopJson}));
    }

    private async getTrainData(): Promise<object[]> {
        return FetchHelper.fetch<object[]>(this.baseUrl);
    }
}