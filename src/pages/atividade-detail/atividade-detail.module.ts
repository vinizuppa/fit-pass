import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadeDetailPage } from './atividade-detail';

@NgModule({
  declarations: [
    AtividadeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadeDetailPage),
  ],
})
export class AtividadeDetailPageModule {}
