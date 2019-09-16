import { Service } from '@rxdi/core';

@Service()
export class TimeService {
  calculateTime(time: string) {
    const date = new Date(time);
    return {
      day: this.getDay(date),
      month: this.getDay(date),
      year: this.getDay(date),
    };
  }

  getDay(date: Date): number {
    return date.getUTCDate();
  }

  getMonth(date: Date): number {
    return date.getUTCDate();
  }

  getYear(date: Date): number {
    return date.getUTCFullYear();
  }
}
