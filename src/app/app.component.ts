import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { PerfilDTO } from '../models/perfil.dto';
import { InstrutorService } from '../services/domain/instrutor.service';
import { AlunoService } from '../services/domain/aluno.service';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  perfil: PerfilDTO;
  localPerfil: PerfilDTO;
  rootPage: string = 'HomePage';//define qual a página que ira aparecer quando o app for aberto

  pages: Array<{title: string, component: string}>;
  pagesA: Array<{title: string, component: string}>;
  pagesI: Array<{title: string, component: string}>;
  aluno: any;
  navCtrl: any;
  instrutor: any;
  instrutorA: boolean;
  indefinidoA: boolean;
  alunoA: boolean;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public alunoService: AlunoService,
    public instrutorService: InstrutorService,
    public usuarioService: UsuarioService,
    public events: Events
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
    ]

    
    this.pagesA = [
      { title: 'Página Inicial', component: 'HomeAlunoPage' },
      { title: 'Perfil', component: 'ProfileAlunoPage' },
      { title: 'Atividades', component: 'AtividadesPage' },
      { title: 'Minhas Avaliações', component: 'ListaAvaliacoesPage' },
      { title: 'Meus Scripts', component: 'ListaScriptsPage' },
      { title: 'Logout', component: ''}
    ]  

    this.pagesI = [
      { title: 'Perfil', component: 'ProfileAlunoPage' },
      { title: 'Atividades', component: 'AtividadesPage' },
      { title: 'Novo Script', component: 'NovoScriptPage' },
      { title: 'Nova Avaliação', component: 'NovaAvaliacaoPage' },
      { title: 'Logout', component: ''}
    ]

}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.loadData();
    });
  }

  loadData(){
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



  findByEmail(email : string){
    //for (let index = 0; index < this.localPerfil.perfis.length; index++) {


     // if(this.localPerfil.perfis[index] == "ALUNO"){
    if(this.localPerfil.perfis.includes("ALUNO")){
          this.alunoA = true;
          this.instrutorA = false;
          this.indefinidoA = false;
          console.log("ALUNO")
      } 
     // else if(this.localPerfil.perfis[index] == "INSTRUTOR"){
      else if(this.localPerfil.perfis.includes("INSTRUTOR")){
          this.alunoA = false;
          this.instrutorA = true;
          this.indefinidoA = false;
          console.log("INSTRUTOR")
      } 
      else if (this.localPerfil.perfis.includes(undefined)){
        this.indefinidoA = true;
        this.alunoA = false;
        this.instrutorA = false;
        console.log("INDEFINIDO")
      }
   // }   
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



