import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'helpers-validador',
  template: '',
})

export class ValidadorComponent implements OnInit {

  /* Implementa padrões personalizados para a validação dos formulários */

  constructor() { }

  ngOnInit(): void { }

  static ValidaCPF(controle: AbstractControl) { //Valida o campo para a hipótese de ser um CPF
    
    const cpf = controle.value;

    if(cpf != null && cpf != undefined && cpf != " "){


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

      return { cpfInvalido: true };
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
          return null;
        } else {
          return { cpfInvalido: true };
        }
      } else {
        return { cpfInvalido: true };
      }
    }
  }
  return null;
  }
  

  

  static ValidaLogin(controle: AbstractControl) { //Valida o campo para a hipótese de ser um nome de login previsto
    const usuario = controle.value;

    const regex = new RegExp('^[a-zA-Z0-9._]{2,19}[^ ,;//\'"!@#$%¨&*()]$');

    if (usuario == '' || usuario == ' ' || !regex.test(usuario)) {
      return { usuarioInvalido: true };
    } else {
      return null;
    }

  }

  static ValidaParam(controle: AbstractControl) { //Valida o campo para a hipótese de prevista no REGEX
    const param = controle.value;

    const regex = new RegExp('[a-zA-Z0-9.]{3,}[^ ,;//\'"!@#$%¨&*()]$');

    if (param == '' || param == ' ' || !regex.test(param)) {
      return { paramInvalido: true };
    } else {
      return null;
    }
  }

  static ValidaRg(rg) { //Valida o campo para a hipótese de ser um RG PM sem dígito de verificação
    const regex = new RegExp('[0-9\/]{5,8}$');
    if (rg.length >= 5 && rg.length <= 6)
      if (regex.test(rg))
        return true
      else
        return false
    else
      return false;
  }

  static ValidaCpf_RG(controle: AbstractControl) { //Valida o campo para a hipótese de ser um CPF ou RG PM
    var aux: string = controle.value;

    if (aux.length == 11) {
      var cpf = aux;
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

        return { cpfrgInvalido: true };
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
            return null;
          } else {
            return { cpfrgInvalido: true };
          }
        } else {
          return { cpfrgInvalido: true };
        }
      }
    } else {
      var rg: string = aux;;

      if (!ValidadorComponent.ValidaRg(rg))
        return { cpfrgInvalido: true }
      else
        return null
    }
  }

  static ValidaSenhas(a: AbstractControl, b: AbstractControl) { //Valida o campo para a hipótese de senhas iguais
    if (a.value !== b.value) {
      return { senhasDiferente: true }
    }
    else
      return { senhasDiferentes: false }
  }
}