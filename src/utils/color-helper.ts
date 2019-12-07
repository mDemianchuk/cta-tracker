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
        ColorHelper.colorMap.set('red', '#ff443a');
        ColorHelper.colorMap.set('blue', '#0a84ff');
        ColorHelper.colorMap.set('brn', '#ac8f68');
        ColorHelper.colorMap.set('g', '#30d158');
        ColorHelper.colorMap.set('org', '#ff9d0a');
        ColorHelper.colorMap.set('p', '#bf5af2');
        ColorHelper.colorMap.set('pink', '#ff375f');
        ColorHelper.colorMap.set('y', '#ffd60a');
    }
}