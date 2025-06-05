import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(value: number): string {
    //const num = Number(value);
    switch (Number(value)) {
      case 0:
        return 'Select';
      case 1:
        return 'Scheduled';
      case 2:
        return 'Completed';
      case 3:
        return 'Cancelled';
      default:
        return 'Invalid Status';
    }
  }
}
