import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class CidadeService{
    constructor(public http: HttpClient){
    }

    findAll(estado_id: string) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}