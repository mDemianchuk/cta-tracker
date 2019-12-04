import * as ons from "onsenui";
import {ColorHelper} from "./color-helper";
import {TimeHelper} from "./time-helper";
import {Route} from "../models/route";
import {Prediction} from "../models/prediction";

export class PageHelper {
    private static navigatorMap = new Map<number, string>([
        [0, '#bus-navigator'],
        [1, '#train-navigator'],
        [2, '#favorite-stop-navigator']
    ]);

    private constructor() {
    }

    static getNavigatorByTabIndex(index: number): ons.OnsNavigatorElement {
        let navigatorId = PageHelper.navigatorMap.get(index) as string;
        return document.querySelector(navigatorId) as ons.OnsNavigatorElement;
    };

    static createRouteListElement(route: Route, eventListener: EventListener): ons.OnsListItemElement {
        const thumbnail = PageHelper.createThumbnail(route.id) as ons.OnsPageElement;
        const listItem = ons.createElement(`
            <ons-list-item tappable modifier="longdivider chevron">
              <div class="left"></div>
              <div class="center">${route.name}</div>
            </ons-list-item>
        `) as ons.OnsListItemElement;
        listItem.querySelector('.left')!.appendChild(thumbnail);
        listItem.addEventListener('click', eventListener);
        return listItem;
    }

    static createStopListElement(name: string, eventListener: EventListener): ons.OnsListItemElement {
        const listItem = ons.createElement(`
            <ons-list-item tappable modifier="longdivider chevron">
                ${name}
            </ons-list-item>
        `) as ons.OnsListItemElement;
        listItem.addEventListener('click', eventListener);
        return listItem;
    }

    static createPredictionListElement(prediction: Prediction, routeName: string, icon: string): ons.OnsListItemElement {
        const timeToDisplay: string = TimeHelper.getDisplayTime(prediction.arrivalTime);
        const thumbnail = PageHelper.createThumbnail(timeToDisplay) as ons.OnsPageElement;
        const listItem = ons.createElement(`
            <ons-list-item modifier="longdivider">
                <div class="left"></div>
                <div class="center">
                  <span class="list-item__title">${routeName}</span>
                  <span class="list-item__subtitle">to ${prediction.destination}</span>
                </div>
                <div class="right">
                    <ons-icon class="prediction_icon" icon="${icon}"></ons-icon>
                    ${prediction.vehicleId}
                </div>
            </ons-list-item>
        `) as ons.OnsListItemElement;
        listItem.querySelector('.left')!.appendChild(thumbnail);
        return listItem;
    }

    static createToggleFab(eventListener: EventListener): ons.OnsFabElement {
        const toggleFab = ons.createElement(`
            <ons-fab position="bottom right">
                <ons-icon icon="fa-exchange"></ons-icon>
            </ons-fab>
        `) as ons.OnsFabElement;
        toggleFab.addEventListener('click', eventListener);
        return toggleFab;
    }

    static addListHeader(page: ons.OnsPageElement, header: string): void {
        const stopList = page.querySelector('ons-list') as ons.OnsListItemElement;
        const stopListHeader = ons.createElement(`
            <ons-list-header>${header}</ons-list-header>
        `) as ons.OnsListItemElement;
        stopList.appendChild(stopListHeader);
    }

    static addToolbarTitle(page: ons.OnsPageElement, title: string): void {
        const toolbarCenter = page.querySelector('ons-toolbar .center') as ons.OnsToolbarElement;
        const toolbarTitle = ons.createElement(`
            <span>${title}</span>
        `) as ons.OnsToolbarElement;
        toolbarCenter.appendChild(toolbarTitle);
    }

    static createThumbnail(routeId: string): ons.OnsPageElement {
        const color: string | undefined = ColorHelper.getColorCodeByRouteId(routeId);
        if (color) {
            return ons.createElement(`
                <span class="route_thumbnail" style="border: solid ${color} 2px;"></span>
            `) as ons.OnsPageElement;
        } else {
            return ons.createElement(`
                <span class="route_thumbnail">${routeId}</span>
            `) as ons.OnsPageElement;
        }
    }

    static addPredictionTime(page: ons.OnsPageElement) {
        const bottomBoxElement = page.querySelector('.bottom-box') as Element;
        const predictionTimeElement = ons.createElement(`
            <p>Last updated at ${TimeHelper.getFormattedCurrentTime()}</p>
        `) as Element;
        bottomBoxElement.appendChild(predictionTimeElement);
    }


    static addEmptyListMessage(page: ons.OnsPageElement, entityName: string) {
        const bottomBoxElement = page.querySelector('.bottom-box') as Element;
        const emptyListElement = ons.createElement(`
            <p>No ${entityName} currently available</p>
        `) as Element;
        bottomBoxElement.appendChild(emptyListElement);
    }

    static addSpinner(page: ons.OnsPageElement) {
        const spinner = ons.createElement(`
            <ons-progress-circular 
                style="
                    margin: 0;
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);"
                indeterminate>
            </ons-progress-circular>
        `) as ons.OnsProgressCircularElement;
        page.appendChild(spinner);
    }

    static removeSpinner(page: ons.OnsPageElement) {
        const spinner = page.querySelector('ons-progress-circular') as ons.OnsProgressCircularElement;
        page.removeChild(spinner);
    }

    static async pushPage(page: string, navigatorId: string, options: object = {}): Promise<HTMLElement> {
        const navigator = document.querySelector(navigatorId) as ons.OnsNavigatorElement;
        return navigator.bringPageTop(page, options);
    }

    static async replacePage(page: string, navigatorId: string, options: object = {}): Promise<HTMLElement> {
        const navigator = document.querySelector(navigatorId) as ons.OnsNavigatorElement;
        return navigator.replacePage(page, options);
    }
}