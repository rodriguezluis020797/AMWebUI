import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../models/Enums';

@Pipe({
    name: 'dayOfTheWeek'
})
export class DayOfTheWeekPipe implements PipeTransform {
    transform(value: DayOfWeek): string {
        console.log('hit')
        switch (Number(value)) {
            case DayOfWeek.Sunday:
                return 'Sunday';
            case DayOfWeek.Monday:
                return 'Monday';
            case DayOfWeek.Tuesday:
                return 'Tuesday';
            case DayOfWeek.Wednesday:
                return 'Wednesday';
            case DayOfWeek.Thursday:
                return 'Thursday';
            case DayOfWeek.Friday:
                return 'Friday';
            case DayOfWeek.Saturday:
                return 'Saturday';
            default:
                return 'Unknown';
        }
    }
}
