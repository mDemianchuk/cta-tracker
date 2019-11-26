import * as ons from "onsenui";

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

    static async pushPage(page: string, navigatorId: string, options: object): Promise<HTMLElement> {
        const navigator = document.querySelector(navigatorId) as ons.OnsNavigatorElement;
        return navigator.bringPageTop(page, options);
    }

    static async replacePage(page: string, navigatorId: string, options: object): Promise<HTMLElement> {
        const navigator = document.querySelector(navigatorId) as ons.OnsNavigatorElement;
        return navigator.replacePage(page, options);
    }
}