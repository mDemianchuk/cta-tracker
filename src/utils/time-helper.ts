export class TimeHelper {
    private static readonly TIMESTAMP_OFFSET: number = 21600000;

    private constructor() {
    }

    static getDisplayTime(timestamp: number): string {
        const timeDifference: number = (timestamp + TimeHelper.TIMESTAMP_OFFSET) - new Date().getTime();
        const remainingTimeInMinutes: number = Math.round(timeDifference / 60000);

        if (remainingTimeInMinutes < 1) {
            return 'Arr.';
        }
        return `${remainingTimeInMinutes}m`;
    }
}