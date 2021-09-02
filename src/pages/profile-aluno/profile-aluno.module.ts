import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAlunoPage } from './profile-aluno';

@NgModule({
  declarations: [
    ProfileAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAlunoPage),
  ],
})
export class ProfileAlunoPageModule {}
