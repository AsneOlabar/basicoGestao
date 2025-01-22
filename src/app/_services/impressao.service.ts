import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ImpressaoService {

  constructor(
    private spinner: NgxSpinnerService

  ) { }




  async printer(div, nome){
    const doc = new jsPDF('l', 'pt');
    this.spinner.show()

    let conteudo = document.getElementById(div);
    await html2canvas(conteudo, {width: 0})
      .then((canvas)=> {
        doc.addImage(canvas.toDataURL('image/png'), "PNG", 1,1,0,0);
      });
       
      this.spinner.hide()
      
      doc.save(nome);



  }


  imprimir(div, titulo) {
    let conteudo = document.getElementById(div).innerHTML;

    let tela_impressao = window.open('Relatório de acessos');

    tela_impressao.document.write(`<h1 class="text-center bg-primary" style="text-align: center;background-color: black;color: white;margin: 3rem;">${titulo}</h1>`);
    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    //tela_impressao.window.close();
   
  }
}
