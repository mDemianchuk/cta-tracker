import * as ons from "onsenui";

export class PageHelper {
    private constructor() {
    }

    static async changePage(page: string): Promise<HTMLElement> {
        const navigator = document.querySelector('#navigator') as ons.OnsNavigatorElement;
        return navigator.bringPageTop(page);
    }

    static async updateTitle(titleName: string, elementId: string): Promise<void> {
        const title: Element = document.querySelector(elementId)!;
        title.innerHTML = titleName;
        return Promise.resolve();
    }
}