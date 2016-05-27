import {Injectable, Pipe} from 'angular2/core';

/*
  Generated class for the Sort pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'sort',
  pure: true
})
@Injectable()
export class Sort {
  public transform(array: Array<Object>, args: string): Array<Object> {
    let sortCriteria = args[0];
    if (array) {
      array.sort((a: any, b: any) => {
        if (a[sortCriteria] < b[sortCriteria]) {
          return -1;
        }
        if (a[sortCriteria] > b[sortCriteria]) {
          return 1;
        }
        return 0;
      });
    }
    return array;
  }
}
