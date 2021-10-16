import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAvaliacoesPage } from './lista-avaliacoes';

@NgModule({
  declarations: [
    ListaAvaliacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAvaliacoesPage),
  ],
})
export class ListaAvaliacoesPageModule {}
