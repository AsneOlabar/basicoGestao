import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value) {
    if (value != null) {
    var cell = value.substring(0,0)+value.substring(0,3)+'.'+value.substring(3,6)+'.'+value.substring(6,9)+'-'+value.substring(9,11);
    return cell;
    } else {
        return value;
    }
}

}
