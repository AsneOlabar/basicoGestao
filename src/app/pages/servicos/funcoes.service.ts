import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

  constructor() { }

  ValidaCPF(cpf) { //Valida o campo para a hipótese de ser um CPF



    if (cpf != null && cpf != undefined && cpf != " ") {


      let soma: number = 0;
      let resto: number;
      let valido: boolean = true;
      let digito1: number = 0;
      let digito2: number = 0;
      const regex = new RegExp('[0-9]{11}');

      if (
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999' ||
        !regex.test(cpf)
      ) {
        valido = false;

        return valido;
      } else {
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf[i]) * (10 - i);
        }

        resto = soma % 11;

        if (resto < 2) {
          digito1 = 0;
        } else {
          digito1 = 11 - resto;
        }

        if (digito1 === parseInt(cpf[9])) {
          soma = 0;

          for (let i = 0; i <= 9; i++) {
            soma += parseInt(cpf[i]) * (11 - i);
          }

          resto = soma % 11;

          if (resto < 2) {
            digito2 = 0;
          } else {
            digito2 = 11 - resto;
          }

          if (digito2 == parseInt(cpf[10])) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false
  }
}
