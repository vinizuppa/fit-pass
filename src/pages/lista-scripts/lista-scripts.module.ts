import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaScriptsPage } from './lista-scripts';

@NgModule({
  declarations: [
    ListaScriptsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaScriptsPage),
  ],
})
export class ListaScriptsPageModule {}
