import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AlunoDTO } from '../../models/aluno.dto';
import { InstrutorDTO } from '../../models/instrutor.dto';
import { AlunoService } from '../../services/domain/aluno.service';
import { InstrutorService } from '../../services/domain/instrutor.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-novo-script',
  templateUrl: 'novo-script.html',
})
export class NovoScriptPage {
  alunos: AlunoDTO[];
  formGroup: FormGroup;
  instrutor: InstrutorDTO;
  valor;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public instrutorService: InstrutorService,
    public alunoService: AlunoService) {
      this.formGroup = this.formBuilder.group({
        alunoId: [null, [Validators.required]],
        instrutor: [null, [Validators.required]]
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

  checkValue(value){
    return value;
   }

}
