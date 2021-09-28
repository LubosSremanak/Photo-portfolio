import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textOverflow'
})
export class TextOverflowPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 50) {
      return value.substring(0,50)+'...';
    }
    return value;
  }

}
