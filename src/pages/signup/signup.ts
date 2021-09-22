import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, MenuClose, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
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
  radioValue;
  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public menu: MenuController,
    public formBuilder: FormBuilder){
        this.formGroup = this.formBuilder.group({
          nome: ['Vinicius Cordeiro Zuppa', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['vcordeiro12@hotmail.com', [Validators.required, Validators.email]],
          cpf: ['11518665047', [Validators.required]],
          biotipo: [1, [Validators.required]],
          data_nasc: ["2001-02-15", [Validators.required]],
          sexo: ['M', [Validators.required]],
          senha: ['vini123', [Validators.required]],
          peso: [77.90, [Validators.required]],
          altura: [1.72, [Validators.required]],
          imc:[100, [Validators.required]],
          logradouro: ['Rua Boituva', [Validators.required]],
          cep: ['19880000',[Validators.required]],
          numero: ['128', [Validators.required]],
          complemento: ['Próximo a Rodoviária', []],
          bairro: ['Vila Operária', []],
          telefone1: ['996922381', [Validators.required]],
          telefone2: ['996011503', []],
          cidadeId: [null, [Validators.required]],
          estadoId: [null, [Validators.required]],
          numCrf: ['550123', [Validators.required]]
        });        
  }

  ionViewWillEnter() {//Quando entra na página de login, desabilita o menu
    
     this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.radioValue = 'aluno';
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
