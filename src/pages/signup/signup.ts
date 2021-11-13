import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, MenuClose, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { AlunoService } from '../../services/domain/aluno.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { InstrutorService } from '../../services/domain/instrutor.service';
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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public alunoService: AlunoService,
    public instrutorService: InstrutorService,
    public alertCtrl: AlertController){
        this.formGroup = this.formBuilder.group({
          nome: ['Diego Perez', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['vcordeiro12@bol.com', [Validators.required, Validators.email]],
          cpf: ['15213434037', [Validators.required]],
          biotipo: [1, [Validators.required]],
          data_nasc: ["2001/02/15", [Validators.required]],
          sexo: ['M', [Validators.required]],
          senha: ['senha', [Validators.required]],
          peso: [78.85, [Validators.required]],
          altura: [1.88, [Validators.required]],
          imc:[100, [Validators.required]],
          logradouro: ['Rua Boituva', [Validators.required]],
          cep: ['19880000',[Validators.required]],
          numero: ['128', [Validators.required]],
          complemento: ['Próximo mercado', []],
          bairro: ['Vila operária', []],
          telefone1: ['996922381', [Validators.required]],
          telefone2: ['33414790', []],
          cidadeId: [null, [Validators.required]],
          estadoId: [null, [Validators.required]],
          numCrf: ['115477', [Validators.required]]
        });        
  }

  ionViewWillEnter() {//Quando entra na página de login, desabilita o menu
    
     this.menu.swipeEnable(false);
     
  }

  ionViewDidLoad() {
    this.radioValue = 'aluno';
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

 checkValue(value){//Função que verifica se o usuário a ser criado é do tipo aluno, instrutor ou estabelecimento
  if(value=="aluno"){
    this.aluno = true;
    this.instrutor = false;
    this.estabelecimento = false;
    this.formGroup.removeControl('numCrf');
    this.formGroup.addControl('biotipo', this.formBuilder.control(1, [Validators.required]));
    this.formGroup.addControl('imc', this.formBuilder.control(100, [Validators.required]));
    this.formGroup.addControl('peso', this.formBuilder.control(85.66, [Validators.required]));
    this.formGroup.addControl('altura', this.formBuilder.control(1.89, [Validators.required]));
  }

  else if(value=="instrutor"){
    this.aluno = false;
    this.instrutor = true;
    this.estabelecimento = false;
    this.formGroup.addControl('numCrf', this.formBuilder.control('115655', [Validators.required]));
    this.formGroup.removeControl('biotipo');
    this.formGroup.removeControl('imc');
    this.formGroup.removeControl('peso');
    this.formGroup.removeControl('altura');
  }

  else if(value=="estabelecimento"){
    this.aluno = false;
    this.instrutor = false;
    this.estabelecimento = true;
    this.formGroup.removeControl('numCrf');
    this.formGroup.removeControl('biotipo');
    this.formGroup.removeControl('imc');
    this.formGroup.removeControl('peso');
    this.formGroup.removeControl('altura');
  }
   
 }
    
  signupUser(){
    console.log(this.formGroup.value);
    if(this.aluno){
      this.alunoService.insert(this.formGroup.value)
      .subscribe(response =>{
        this.showInsertOk();
      },
      error => {});
    }

    else if(this.instrutor){
      this.instrutorService.insert(this.formGroup.value)
      .subscribe(response =>{
        this.showInsertOk();
      },
      error => {});
    }
   
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
         text: 'Ok',
         handler: () =>{
          this.navCtrl.pop();
         }   

        }
      ]
    });
   alert.present();
  }

}
