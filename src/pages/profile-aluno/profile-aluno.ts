import { Component } from '@angular/core';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { AlunoDTO } from '../../models/aluno.dto';
import { InstrutorDTO } from '../../models/instrutor.dto';
import { PerfilDTO } from '../../models/perfil.dto';
import { AlunoService } from '../../services/domain/aluno.service';
import { InstrutorService } from '../../services/domain/instrutor.service';
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
  instrutor: InstrutorDTO;
  perfil: PerfilDTO;
  localPerfil: PerfilDTO;
  alunoA: boolean;
  instrutorA: boolean;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public alunoService: AlunoService,
    public instrutorService: InstrutorService,
    public usuarioService: UsuarioService,
    public camera: Camera) {
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

      else if(this.localPerfil.perfis[index] == "INSTRUTOR"){
        this.instrutorService.getImageFromBucket(this.instrutor.id)
        .subscribe(response =>{
          this.instrutor.imageUrl = `${API_CONFIG.bucketBaseUrl}/ins${this.instrutor.id}.jpg`
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
          this.alunoA = true;
          this.instrutorA = false;
        },
        error =>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      } 
      else if(this.localPerfil.perfis[index] == "INSTRUTOR"){
        this.instrutorService.findByEmail(email)
        .subscribe(response => {
          this.instrutor = response;
          this.getImageIfExists();
          this.alunoA = false;
          this.instrutorA = true;
        },
        error =>{
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
      } 
    }   
  } 
  
  getCameraPicture(){
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
     // Handle error
    });
  }

}
