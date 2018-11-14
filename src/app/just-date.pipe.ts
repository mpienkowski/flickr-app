import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'justDate'
})
export class JustDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }
}
