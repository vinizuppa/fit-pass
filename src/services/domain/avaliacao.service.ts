import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { AvaliacaoDTO } from "../../models/avaliacao.dto";
import { InstrutorDTO } from "../../models/instrutor.dto";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class AvaliacaoService{
    constructor(public http: HttpClient){
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
}