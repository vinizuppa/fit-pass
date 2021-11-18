import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvaliacaoDTO } from '../../models/avaliacao.dto';
import { AvaliacaoService } from '../../services/domain/avaliacao.service';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ListaAvaliacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-avaliacoes',
  templateUrl: 'lista-avaliacoes.html',
})
export class ListaAvaliacoesPage {
  items: AvaliacaoDTO[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public avaliacaoService: AvaliacaoService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 600
    });
    this.avaliacaoService.findAll()
    .subscribe(response => {//Usamos arrow function
      loader.present();
      this.items = response.content;
      console.log(this.items);
    },
    error => {});

  }


}
