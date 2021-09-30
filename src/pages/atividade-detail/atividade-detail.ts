import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtividadeDTO } from '../../models/atividade.dto';


@IonicPage()
@Component({
  selector: 'page-atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetailPage {
  item: AtividadeDTO;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id: "1",
      nome: "Rosca Invertida",
      descricao: "Aumentar Triceps"
    }
  }

}
