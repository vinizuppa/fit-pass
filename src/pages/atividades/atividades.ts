import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { AtividadeDTO } from '../../models/atividade.dto';
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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: AtividadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atividadeService: AtividadeService) {
  }

  ionViewDidLoad() {//Evento que executa o que estiver dentro, assim que a página terminar de ser carregada
    this.atividadeService.findAll()
    .subscribe(response => {//Usamos arrow function
      this.items = response;
    },
    error => {
      
    });

  }

}
