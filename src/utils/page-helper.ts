import * as ons from "onsenui";
import {ColorHelper} from "./color-helper";
import {TimeHelper} from "./time-helper";
import {Route} from "../models/route";
import {Prediction} from "../models/prediction";

export class PageHelper {
    private static tabMap: Map<number, string> = new Map([[0, "train"], [1, "bus"]]);

    private constructor() {
    }

    private static getActiveTabIndex(): number {
        const tabBar = document.querySelector('ons-tabbar') as ons.OnsTabbarElement;
        return tabBar.getActiveTabIndex();
    }

    static getNextTabIndex(): number {
        const activeTabIndex = PageHelper.getActiveTabIndex();
        return Math.abs(activeTabIndex - 1);
    }

    private static getTabTypeByIndex(index: number): string {
        return PageHelper.tabMap.get(index)!;
    }

    private static getTabNavigatorByIndex(index: number): ons.OnsNavigatorElement {
        const tabType: string = PageHelper.getTabTypeByIndex(index);
        return PageHelper.getTabNavigatorByType(tabType);
    }

    static getTabNavigatorByType(tabType: string): ons.OnsNavigatorElement {
        return document.querySelector(`#${tabType}-navigator`) as ons.OnsNavigatorElement;
    }

    static getMainToolbar(): ons.OnsToolbarElement {
        return document.querySelector('#main-toolbar') as ons.OnsToolbarElement;
    }

    static getTabToolbarByIndex(index: number): ons.OnsToolbarElement {
        const tabNavigator = PageHelper.getTabNavigatorByIndex(index);
        const topPage = tabNavigator.topPage;
        return PageHelper.getTabToolbarByPage(topPage);
    }

    static getTabToolbarByPage(page: HTMLElement): ons.OnsToolbarElement {
        return page.querySelector('ons-toolbar') as ons.OnsToolbarElement;
    }

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
                <span class="route_thumbnail" style="background: ${color};"></span>
            `) as ons.OnsPageElement;
        } else {
            return ons.createElement(`
                <span class="route_thumbnail">${routeId}</span>
            `) as ons.OnsPageElement;
        }
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