import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aditCurrency'
})
export class AditCurrencyPipe implements PipeTransform {
  transform(value: number, arg: string): string {
    return "CHF " + value.toFixed(2);
  }
}