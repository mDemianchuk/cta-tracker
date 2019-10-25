import {TrainRoute} from "../models/train-route";
import {TrainRouteId} from "../models/train-route-id";

export class TrainRouteProvider {
    private static readonly ROUTE_MAP: Map<string, TrainRoute> = new Map();
    private static RED_LINE: TrainRoute;
    private static BLUE_LINE: TrainRoute;
    private static BROWN_LINE: TrainRoute;
    private static GREEN_LINE: TrainRoute;
    private static ORANGE_LINE: TrainRoute;
    private static PURPLE_LINE: TrainRoute;
    private static PINK_LINE: TrainRoute;
    private static YELLOW_LINE: TrainRoute;

    private constructor() {
    }

    static getRoutes(): TrainRoute[] {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return Array.from(TrainRouteProvider.ROUTE_MAP.values());
    }

    static getRoute(id: string): TrainRoute | undefined {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return TrainRouteProvider.ROUTE_MAP.get(id);
    }

    static getRouteShortIds(json: { [key: string]: any }): string[] {
        let routeShortIds: string[] = Object.values(TrainRouteId);
        routeShortIds = routeShortIds.filter((routeShortId => json.hasOwnProperty(routeShortId) && json[routeShortId]));
        return routeShortIds;
    }

    static containsRoutes(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty(TrainRouteId.RED)
            && json.hasOwnProperty(TrainRouteId.BLUE)
            && json.hasOwnProperty(TrainRouteId.GREEN)
            && json.hasOwnProperty(TrainRouteId.BROWN)
            && json.hasOwnProperty(TrainRouteId.PURPLE)
            && json.hasOwnProperty(TrainRouteId.YELLOW)
            && json.hasOwnProperty(TrainRouteId.PINK_SHORT)
            && json.hasOwnProperty(TrainRouteId.ORANGE_SHORT);
    }

    private static initializeRoutes(): void {
        TrainRouteProvider.RED_LINE = new TrainRoute(TrainRouteId.RED, 'Red Line', TrainRouteId.RED);
        TrainRouteProvider.BLUE_LINE = new TrainRoute(TrainRouteId.BLUE, 'Blue Line', TrainRouteId.BLUE);
        TrainRouteProvider.BROWN_LINE = new TrainRoute(TrainRouteId.BROWN, 'Brown Line', TrainRouteId.BROWN);
        TrainRouteProvider.GREEN_LINE = new TrainRoute(TrainRouteId.GREEN, 'Green Line', TrainRouteId.GREEN);
        TrainRouteProvider.ORANGE_LINE = new TrainRoute(TrainRouteId.ORANGE, 'Orange Line', TrainRouteId.ORANGE_SHORT);
        TrainRouteProvider.PURPLE_LINE = new TrainRoute(TrainRouteId.PURPLE, 'Purple Line', TrainRouteId.PURPLE);
        TrainRouteProvider.PINK_LINE = new TrainRoute(TrainRouteId.PINK, 'Pink Line', TrainRouteId.PINK_SHORT);
        TrainRouteProvider.YELLOW_LINE = new TrainRoute(TrainRouteId.YELLOW, 'Yellow Line', TrainRouteId.YELLOW);

        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.RED, TrainRouteProvider.RED_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BLUE, TrainRouteProvider.BLUE_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BROWN, TrainRouteProvider.BROWN_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.GREEN, TrainRouteProvider.GREEN_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.ORANGE, TrainRouteProvider.ORANGE_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.ORANGE_SHORT, TrainRouteProvider.ORANGE_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PURPLE, TrainRouteProvider.PURPLE_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PINK, TrainRouteProvider.PINK_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PINK_SHORT, TrainRouteProvider.PINK_LINE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.YELLOW, TrainRouteProvider.YELLOW_LINE);
    }

    private static isInitialized(): boolean {
        return TrainRouteProvider.ROUTE_MAP.size > 0;
    }
}