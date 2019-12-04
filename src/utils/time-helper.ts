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
        let hours: number = currentTime.getHours();
        const minutes: number = currentTime.getMinutes();
        const amPm: string = hours > 12 ? 'pm' : 'am';
        hours = hours % 12;
        const hoursRepresentation: string =  hours == 0 ? `12` : `${hours}`;
        const minutesRepresentation: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${hoursRepresentation}:${minutesRepresentation}${amPm}`;
    }
}