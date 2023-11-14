import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'a few seconds ago';
      const intervals: { [key: string]: number } = {
        y: 31536000,
        M: 2592000,
        w: 604800,
        d: 86400,
        h: 3600,
        m: 60,
        a: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          return counter + '' + i + ' ago';
        }
      }
    }
    return value;
  }
}
