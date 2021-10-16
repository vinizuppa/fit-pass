import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operator/map";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { AvaliacaoDTO, Content } from "../../models/avaliacao.dto";
import { InstrutorDTO } from "../../models/instrutor.dto";
import { AuthService } from "../auth.service";
import { StorageService } from "../storage.service";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class AvaliacaoService{
    constructor(public http: HttpClient,
        public storage :StorageService,
        public auth: AuthService,
        ){
    }

    insert(obj: AvaliacaoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/avaliacoes/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findAll() : Observable<Content>{
        return this.http.get<Content>(`${API_CONFIG.baseUrl}/avaliacoes/`);
    }
}