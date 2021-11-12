import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItensScriptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itens-script',
  templateUrl: 'itens-script.html',
})
export class ItensScriptPage {
  formGroup: FormGroup;
  @Input('valor')
  valor: any
  @Input('itensScript')
  itensScript: any[]

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
    ) {
      this.formGroup = this.formBuilder.group({
        qtd_rep: [null, [Validators.required]],
        qtd_series: [1, [Validators.required]],
        diasemana: [0, [Validators.required]]
        //atividade: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItensScriptPage');
  }

  checkValue(value){
    const obj = this.formGroup.value;
    this.itensScript.forEach(item => {
      if(item.index==this.valor){
        this.itensScript.splice(
          this.itensScript.indexOf(item),1
        )
      }
    })
    //this.itensScript.splice(this.valor, 1);
    this.itensScript.push(
      {
        "qtd_rep" : obj.qtd_rep,   
        "qtd_series" : obj.qtd_series,
        "diasemana" : obj.diasemana,
        "atividade" : {"id" : 1},
        "index": this.valor
      }
    )
    console.log(this.itensScript);
   }


}
