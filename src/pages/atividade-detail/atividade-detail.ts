import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtividadeDTO } from '../../models/atividade.dto';
import { AtividadeService } from '../../services/domain/atividade.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetailPage {
  item: AtividadeDTO;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public atividadeService: AtividadeService) {
  }

  ionViewDidLoad() {
    let atividade_id = this.navParams.get('atividade_id')// Pegand ID que foi enviado na navegação
    this.atividadeService.findById(atividade_id)
      .subscribe(response =>{
        this.item = response;
        this.getImageIfExists();
      },
      error => {});
  }

  getImageIfExists(){
        this.atividadeService.getImageFromBucket(this.item.id)
        .subscribe(response =>{
          this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/atv${this.item.id}.jpg`;
        },
        error =>{});
      }
  }

