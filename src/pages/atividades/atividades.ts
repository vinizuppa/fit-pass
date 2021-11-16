import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { API_CONFIG } from '../../config/api.config';
import { AlunoDTO } from '../../models/aluno.dto';
import { AtividadeDTO } from '../../models/atividade.dto';
import { InstrutorDTO } from '../../models/instrutor.dto';
import { PerfilDTO } from '../../models/perfil.dto';
import { AuthService } from '../../services/auth.service';
import { AlunoService } from '../../services/domain/aluno.service';
import { AtividadeService } from '../../services/domain/atividade.service';
import { InstrutorService } from '../../services/domain/instrutor.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the AtividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades',
  templateUrl: 'atividades.html',
})
export class AtividadesPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  pages: Array<{title: string, component: string}>;
  items: AtividadeDTO[];
  localPerfil: PerfilDTO;
  aluno: AlunoDTO;
  alunoA: boolean;
  instrutorA: boolean;
  instrutor: InstrutorDTO;
  indefinidoA: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atividadeService: AtividadeService,
    public storage: StorageService,
    public alunoService: AlunoService,
    public instrutorService: InstrutorService,
    public auth: AuthService,
    public usuarioService: UsuarioService,
    public teste:  MyApp) {  
  }

  ionViewDidLoad() {//Evento que executa o que estiver dentro, assim que a página terminar de ser carregada
    this.atividadeService.findAll()
    .subscribe(response => {//Usamos arrow function
      this.items = response;
      this.loadImageUrls();
      this.teste.loadData();
    },
    error => {});

  }
  
  loadImageUrls(){
    for(var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.atividadeService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/atv${item.id}.jpg`;
        },
        error => {});
    }
  }
    
  showDetail(atividade_id: string){
    this.navCtrl.push('AtividadeDetailPage', {atividade_id: atividade_id});
  }
}
