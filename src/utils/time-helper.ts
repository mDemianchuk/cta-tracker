export class TimeHelper {
    private constructor() {
    }

    static getDisplayTime(timestamp: string): string {
        const currentTime: Date = new Date();

        let time: Date = new Date(timestamp);
        if (isNaN(time.getTime())) {
            time = new Date(timestamp.replace(
                /^(\d{4})(\d\d)(\d\d) (\d\d):(\d\d)$/,
                '$4:$5:00 $2/$3/$1'
            ));
        }

        // @ts-ignore
        const timeDifference: number = time - currentTime;
        const remainingTimeInMinutes = Math.round(timeDifference / 60000);

        if (remainingTimeInMinutes < 1) {
            return 'Appr.';
        }
        return `${remainingTimeInMinutes} m`;
    }
}