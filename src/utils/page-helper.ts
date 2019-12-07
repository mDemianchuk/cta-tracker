import * as ons from "onsenui";
import {ColorHelper} from "./color-helper";
import {TimeHelper} from "./time-helper";
import {Route} from "../models/route";
import {Prediction} from "../models/prediction";
import {FavoriteStop} from "../models/favorite-stop";

export class PageHelper {
    private static navigatorMap = new Map<number, string>([
        [0, '#bus-navigator'],
        [1, '#train-navigator'],
        [2, '#favorite-navigator']
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

    static createFavoriteStopList(stops: FavoriteStop[]): string {
        const listElement = ons.createElement('<ons-list></ons-list>') as Element;
        stops.forEach((stop: FavoriteStop) => {
            const thumbnail = PageHelper.createThumbnail(stop.routeId) as ons.OnsPageElement;
            const listItem = ons.createElement(`
                <ons-list-item tappable modifier="longdivider chevron">
                    <div class="left"></div>
                    <div class="center">
                      <span class="list-item__title">${stop.stopName}</span>
                      <span class="list-item__subtitle">${stop.direction}</span>
                    </div>
                </ons-list-item>
            `) as ons.OnsListItemElement;
            listItem.querySelector('.left')!.appendChild(thumbnail);
            listElement.appendChild(listItem);
        });
        return listElement.innerHTML;
    }

    static addToggleButton(page: ons.OnsPageElement, eventListener: EventListener): void {
        const toolbarRight = page.querySelector('ons-toolbar .right') as ons.OnsToolbarElement;
        const toggleButton = ons.createElement(`
            <ons-toolbar-button>
                <ons-icon icon="ion-ios-swap, material:md-swap"></ons-icon>
            </ons-toolbar-button>
        `) as ons.OnsToolbarButtonElement;
        toggleButton.addEventListener('click', eventListener);
        toolbarRight.appendChild(toggleButton);
    }

    static addSaveButton(page: ons.OnsPageElement, isSaved: boolean, eventListener: EventListener): void {
        const toolbarRight = page.querySelector('ons-toolbar .right') as ons.OnsToolbarElement;
        const saveButton = ons.createElement(`
            <ons-toolbar-button class="save-button">
                <ons-icon icon="ion-ios-heart-empty, material:md-favorite-outline"></ons-icon>
            </ons-toolbar-button>
        `) as ons.OnsToolbarButtonElement;
        saveButton.addEventListener('click', eventListener);
        toolbarRight.appendChild(saveButton);
        if (isSaved) {
            this.toggleSaveButtonIcon(page);
        }
    }

    static toggleSaveButtonIcon(page: ons.OnsPageElement): void {
        const saveButtonIcon = page.querySelector('.save-button .ons-icon') as Element;
        if (saveButtonIcon.getAttribute('icon') === 'ion-ios-heart, material:md-favorite') {
            saveButtonIcon.setAttribute('icon', 'ion-ios-heart-empty, material:md-favorite-outline');
        } else {
            saveButtonIcon.setAttribute('icon', 'ion-ios-heart, material:md-favorite');
        }
    }

    static addToolbarTitle(page: ons.OnsPageElement, title: string): void {
        const toolbarTitle = page.querySelector('ons-toolbar .center .toolbar-title') as ons.OnsToolbarElement;
        toolbarTitle.innerHTML = title;
    }

    static addToolbarSubtitle(page: ons.OnsPageElement, subtitle: string): void {
        const toolbarSubtitle = page.querySelector('ons-toolbar .center .toolbar-subtitle') as ons.OnsToolbarElement;
        toolbarSubtitle.innerHTML = subtitle;
    }

    static createThumbnail(routeId: string): ons.OnsPageElement {
        const color: string | undefined = ColorHelper.getColorCodeByRouteId(routeId);
        if (color) {
            return ons.createElement(`
                <span class="route_thumbnail" style="background-color: ${color};"></span>
            `) as ons.OnsPageElement;
        } else {
            return ons.createElement(`
                <span class="route_text">${routeId}</span>
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