import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { AlunoDTO } from '../../models/aluno.dto';
import { PerfilDTO } from '../../models/perfil.dto';
import { AlunoService } from '../../services/domain/aluno.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfileAlunoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-aluno',
  templateUrl: 'profile-aluno.html',
})
export class ProfileAlunoPage {

  aluno: AlunoDTO;
  perfil: PerfilDTO;
  localPerfil: PerfilDTO;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public alunoService: AlunoService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.localPerfil = this.storage.getPerfilUser();
    this.usuarioService.findPerfilByEmail(localUser.email).subscribe(response =>{
      this.storage.setPerfilUser(response)
    })
    
    if(localUser && localUser.email){
     this.findByEmail(localUser.email);
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  
  getImageIfExists(){
    for (let index = 0; index < this.localPerfil.perfis.length; index++) {
      if(this.localPerfil.perfis[index] == "ALUNO"){
        this.alunoService.getImageFromBucket(this.aluno.id)
        .subscribe(response =>{
          this.aluno.imageUrl = `${API_CONFIG.bucketBaseUrl}/al${this.aluno.id}.jpg`;
        },
        error =>{});
      }
    }
  }
    
  findByEmail(email : string){
    for (let index = 0; index < this.localPerfil.perfis.length; index++) {
      if(this.localPerfil.perfis[index] == "ALUNO"){
        this.alunoService.findByEmail(email)
        .subscribe(response => {
          this.aluno = response;
          this.getImageIfExists();
        },
        error =>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      } 
    /*  else if(this.localPerfil.perfis[index] == "INSTRUTOR"){
        this.instrutorService.findByEmail(email)
        .subscribe(response => {
          this.instrutor = response;
          this.getImageIfExists();
        },
        error =>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      } */
    }   
  }  

}
