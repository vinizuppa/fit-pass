import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAlunoPage } from './profile-aluno';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ProfileAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAlunoPage),
  ],
  providers: [
    Camera
  ]
})
export class ProfileAlunoPageModule {}
