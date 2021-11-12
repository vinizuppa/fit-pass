import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItensScriptPage } from '../itens-script/itens-script';
import { ItensScriptPageModule } from '../itens-script/itens-script.module';
import { NovoScriptPage } from './novo-script';

@NgModule({
  declarations: [
    NovoScriptPage,
    ItensScriptPage
  ],
  imports: [
    IonicPageModule.forChild(NovoScriptPage),
  ],
})
export class NovoScriptPageModule {}
