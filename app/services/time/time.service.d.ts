export declare class TimeService {
    calculateTime(time: string): {
        day: number;
        month: number;
        year: number;
    };
    getDay(date: Date): number;
    getMonth(date: Date): number;
    getYear(date: Date): number;
}
