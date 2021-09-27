import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class EstadoService{
    constructor(public http: HttpClient){
    }

    findAll() : Observable<EstadoDTO[]>{//Metodo responsável por retornar lista das atividades
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}