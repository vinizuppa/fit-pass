import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { AtividadeDTO } from "../../models/atividade.dto";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class AtividadeService{
    constructor(public http: HttpClient){
    }

    findAll() : Observable<AtividadeDTO[]>{//Metodo responsável por retornar lista das atividades
        return this.http.get<AtividadeDTO[]>(`${API_CONFIG.baseUrl}/atividades`);
    }
}