import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rackRank'
})
export class RackRankPipe implements PipeTransform {

  transform(value: string | undefined){
    if(value){
      console.log(`coucou mon pipe: ${value}`);
      return Number.parseInt(value) + 1;
    } else {
      return '';
    }
  }

}
