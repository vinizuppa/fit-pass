import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { PerfilDTO } from '../models/perfil.dto';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  perfil: PerfilDTO;
  localPerfil: PerfilDTO;
  rootPage: string = 'HomePage';//define qual a página que ira aparecer quando o app for aberto

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public usuarioService: UsuarioService
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Perfil', component: 'ProfileAlunoPage' },
          { title: 'Atividades', component: 'AtividadesPage' },
          { title: 'Novo Script', component: 'NovoScriptPage' },
          { title: 'Nova Avaliação', component: 'NovaAvaliacaoPage' },
          { title: 'Minhas Avaliações', component: 'ListaAvaliacoesPage' },
          { title: 'Meus Scripts', component: 'ListaScriptsPage' },
          { title: 'Página Inicial', component: 'HomeAlunoPage' },
          { title: 'Logout', component: ''}
        ];

  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title:string, component:string}) {
    switch (page.title){
      case 'Logout': 
        this.auth.logout();
        this.nav.setRoot('HomePage');
        break;
        
      default:
        this.nav.setRoot(page.component);
    }
    
  }
}
