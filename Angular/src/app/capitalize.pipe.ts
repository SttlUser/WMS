import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.sort((a, b) => {
      if (a.isActive && !b.isActive) {
        return -1; // Active users come first
      } else if (!a.isActive && b.isActive) {
        return 1; // Inactive users come last
      } else {
        return 0; // Preserve the original order if both are active or inactive
      }
    });
  }

}
