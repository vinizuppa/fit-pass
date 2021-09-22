import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  
})

export class SignupPage {
  aluno: boolean;
  instrutor: boolean;
  estabelecimento: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

  }

 checkValue(value){//Função que verifica se o usuário a ser criado é do tipo aluno, instrutor ou estabelecimento
  if(value=="aluno"){
    this.aluno = true;
    this.instrutor = false;
    this.estabelecimento = false;
  }

  else if(value=="instrutor"){
    this.aluno = false;
    this.instrutor = true;
    this.estabelecimento = false;
  }

  else if(value=="estabelecimento"){
    this.aluno = false;
    this.instrutor = false;
    this.estabelecimento = true;
  }
   
 }
    
  signupUser(){
    console.log("Enviou o Form");
    
  }

  
}
