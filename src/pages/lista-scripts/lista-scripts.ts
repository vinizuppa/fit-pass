import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Script2DTO } from '../../models/script2.dto';
import { ScriptService } from '../../services/domain/script.service';

/**
 * Generated class for the ListaScriptsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-scripts',
  templateUrl: 'lista-scripts.html',
})
export class ListaScriptsPage {
  objs: Script2DTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public scriptService: ScriptService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 600
    });
    this.scriptService.findAll()
    .subscribe(response => {//Usamos arrow function
      loader.present();
      this.objs = response.content;
      console.log(this.objs);
    },
    error => {});
  }

}
