import {FetchHelper} from "../utils/fetch-helper";

export class BusTrackerClient {
    private readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL('http://ec2-34-234-207-80.compute-1.amazonaws.com/');
    }

    async getRotues(): Promise<object[]> {
        const url = new URL('routes', this.baseUrl);
        return FetchHelper.fetch(url);
    }

    async getDirections(routeId: string): Promise<object[]> {
        const url = new URL('directions', this.baseUrl);
        url.searchParams.set('rt', routeId);
        return FetchHelper.fetch(url);
    }

    async getStops(routeId: string, direction: string): Promise<object[]> {
        const url = new URL('stops', this.baseUrl);
        url.searchParams.set('rt', routeId);
        url.searchParams.set('dir', direction);
        return FetchHelper.fetch(url);
    }

    async getPredictions(routeId: string, stopId: string): Promise<object[]> {
        const url = new URL('predictions', this.baseUrl);
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stp', stopId);
        return FetchHelper.fetch(url);
    }
}