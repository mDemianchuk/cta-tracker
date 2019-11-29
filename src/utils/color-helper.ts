export class ColorHelper {
    private static colorMap: Map<string, string>;

    private constructor() {
    }


    static getColorCodeByRouteId(routeId: string): string | undefined {
        if (!ColorHelper.colorMap) {
            ColorHelper.initColorMap();
        }
        return ColorHelper.colorMap.get(routeId);
    }

    private static initColorMap(): void {
        ColorHelper.colorMap = new Map<string, string>();
        ColorHelper.colorMap.set('red', '#c60c30');
        ColorHelper.colorMap.set('blue', '#00a1de');
        ColorHelper.colorMap.set('brn', '#62361b');
        ColorHelper.colorMap.set('g', '#009b3a');
        ColorHelper.colorMap.set('org', '#f9461c');
        ColorHelper.colorMap.set('p', '#522398');
        ColorHelper.colorMap.set('pink', '#e27ea6');
        ColorHelper.colorMap.set('y', '#f9e300');
    }
}