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

    static getFormattedCurrentTime() {
        const currentTime = new Date();
        const hours: number = currentTime.getHours();
        const minutes: number = currentTime.getMinutes();
        const amPm: string = hours > 12 ? 'pm' : 'am';
        const hoursRepresentation: number = hours % 12;
        const minutesRepresentation: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${hoursRepresentation}:${minutesRepresentation}${amPm}`;
    }
}