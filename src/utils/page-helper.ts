import * as ons from "onsenui";
import {ColorHelper} from "./color-helper";
import {TimeHelper} from "./time-helper";

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

    static createToggleFab(): ons.OnsFabElement {
        return ons.createElement(`
            <ons-fab position="bottom right">
                <ons-icon icon="fa-exchange"></ons-icon>
            </ons-fab>
        `) as ons.OnsFabElement;
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
                <span class="route-thumbnail" style="background: ${color};"></span>
            `) as ons.OnsPageElement;
        } else {
            return ons.createElement(`
                <span class="route-thumbnail">${routeId}</span>
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