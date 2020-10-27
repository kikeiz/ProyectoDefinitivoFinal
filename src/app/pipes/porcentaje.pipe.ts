import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentaje'
})
export class PorcentajePipe implements PipeTransform {

  transform(value: number): string {
      return (value + "%")
  }

}
