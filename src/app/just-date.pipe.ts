import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'justDate'
})
export class JustDatePipe implements PipeTransform {
  transform(value: string): string {
    return new Date(value).toDateString();
  }
}
