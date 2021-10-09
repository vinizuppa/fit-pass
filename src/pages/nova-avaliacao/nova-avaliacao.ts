import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AlunoDTO } from '../../models/aluno.dto';
import { InstrutorDTO } from '../../models/instrutor.dto';
import { AlunoService } from '../../services/domain/aluno.service';
import { InstrutorService } from '../../services/domain/instrutor.service';
import { StorageService } from '../../services/storage.service';
import { AvaliacaoService } from '../../services/domain/avaliacao.service';

@IonicPage()
@Component({
  selector: 'page-nova-avaliacao',
  templateUrl: 'nova-avaliacao.html',
})
export class NovaAvaliacaoPage {
  alunos: AlunoDTO[];
  formGroup: FormGroup;
  instrutor: InstrutorDTO;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public instrutorService: InstrutorService,
    public avaliacaoService: AvaliacaoService,
    public alunoService: AlunoService) {
      this.formGroup = this.formBuilder.group({
        instrutorId: [null, [Validators.required]],
        alunoId: [null, [Validators.required]],
        altura: [null, [Validators.required]],
        peso: [null, [Validators.required]],
        imc: [null, [Validators.required]],
        obs: [null, [Validators.required]]
      });
  }
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.alunoService.findAll()
      .subscribe(response => {
        this.alunos = response;
        this.formGroup.controls.alunoId.setValue(this.alunos[0].id);
      },
      error => {});

      if(localUser && localUser.email){
        this.findByEmail(localUser.email);
       }
  }

  findByEmail(email : string){

        this.instrutorService.findByEmail(email)
        .subscribe(response => {
          this.instrutor = response;
        },
        error =>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        }); 
  } 

  submit(){
    console.log(this.formGroup.value);
    this.avaliacaoService.insert(this.formGroup.value)
      .subscribe(response =>{
        this.showInsertOk();
      },
      error => {});
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
         
         }   

        }
      ]
    });
   alert.present();
  }

}
