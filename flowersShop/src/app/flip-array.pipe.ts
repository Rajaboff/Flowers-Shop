import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flipArray'
})
export class FlipArrayPipe implements PipeTransform {

  transform(val: any[]) {
    return val.sort((a,b) => b.id-a.id);
  }

}
