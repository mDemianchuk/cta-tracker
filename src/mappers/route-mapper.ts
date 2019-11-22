import {Route} from "../models/route";

export class RouteMapper {
    static map(json: { [key: string]: any }): Route | undefined {
        let route;
        if (RouteMapper.isValid(json)) {
            route = new Route(json['id'], json['name']);
        }
        return route;
    }

    private static isValid(json: { [key: string]: any }) {
        return json.hasOwnProperty('id')
            && json.hasOwnProperty('name');
    }
}