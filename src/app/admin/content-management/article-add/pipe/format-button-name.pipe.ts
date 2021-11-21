import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatButtonName'
})
export class FormatButtonNamePipe implements PipeTransform {

  transform(value: 'Edit' | 'Add', ...args: unknown[]): unknown {
    if(value==='Edit'){
      return 'Save';
    }
    else{
      return 'Create';
    }
  }

}
