import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
   
  }

  ionViewWillEnter() {//Quando entra na página de login, desabilita o menu
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {//Quando sai na página de login, habilita novamente o menu
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot('AtividadesPage')
  }

}
