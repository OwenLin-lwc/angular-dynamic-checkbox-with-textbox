import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({ name: 'orderBySelected', pure: false })
export class OrderBySelectedPipe implements PipeTransform {

  transform(array: FormGroup[]): any {
    array.sort((a, b) => {
      if (a.get('question').value === b.get('question').value) {
        return 0;
      } else if (a.get('question').value) {
        return -1;
      } else {
        return 1;
      }
    });
    return array;
  }

}