import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtividadeService } from '../../services/domain/atividade.service';

/**
 * Generated class for the AtividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atividadeService: AtividadeService) {
  }

  ionViewDidLoad() {//Evento que executa o que estiver dentro, assim que a página terminar de ser carregada
    this.atividadeService.findAll().subscribe(response => {//Usamos arrow function
      console.log(response);
    },
    error => {
      console.log(error);
    });

  }

}
