import {FetchHelper} from "../utils/fetch-helper";

export class TrainTrackerClient {
    private readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL((process.env.TRAIN_CLIENT_URL) as string);
    }

    async getRotues(): Promise<object[]> {
        const url = new URL('routes', this.baseUrl);
        return FetchHelper.fetch(url);
    }

    async getStations(routeId: string): Promise<object[]> {
        const url = new URL('stations', this.baseUrl);
        url.searchParams.set('rt', routeId);
        return FetchHelper.fetch(url);
    }

    async getStops(routeId: string, stationId: string): Promise<object[]> {
        const url = new URL('stops', this.baseUrl);
        url.searchParams.set('rt', routeId);
        url.searchParams.set('st', stationId);
        return FetchHelper.fetch(url);
    }

    async getPredictions(routeId: string, stopId: string): Promise<object[]> {
        const url = new URL('predictions', this.baseUrl);
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stp', stopId);
        return FetchHelper.fetch(url);
    }
}
