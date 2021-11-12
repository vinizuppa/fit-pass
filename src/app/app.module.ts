import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AtividadeService } from '../services/domain/atividade.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AlunoService } from '../services/domain/aluno.service';
import { AuthInterceptor, AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { UsuarioService } from '../services/domain/usuario.service';
import { InstrutorService } from '../services/domain/instrutor.service';
import { AvaliacaoService } from '../services/domain/avaliacao.service';
import { ImageUtilService } from '../services/image-util.service';
import { ItensScriptPage } from '../pages/itens-script/itens-script';
import { ScriptService } from '../services/domain/script.service';

@NgModule({//Anotação que tem configurações para alterar a classe
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AtividadeService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService, 
    StorageService,
    AlunoService,
    InstrutorService,
    UsuarioService,
    AvaliacaoService, 
    ImageUtilService,
    ScriptService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
