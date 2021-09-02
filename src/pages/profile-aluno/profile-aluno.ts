import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { AlunoDTO } from '../../models/aluno.dto';
import { AlunoService } from '../../services/domain/aluno.service';
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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public alunoService: AlunoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.alunoService.findByEmail(localUser.email)
        .subscribe(response => {
          this.aluno = response;
          this.getImageIfExists();
        },
        error =>{});
    }
  }

  getImageIfExists(){
    this.alunoService.getImageFromBucket(this.aluno.id)
      .subscribe(response =>{
        this.aluno.imageUrl = `${API_CONFIG.bucketBaseUrl}/al${this.aluno.id}.jpg`;
      },
      error =>{});
  }

}
