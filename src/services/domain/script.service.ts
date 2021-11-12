import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ScriptDTO } from "../../models/script.dto";
import { Content } from "../../models/script2.dto";
import { AuthService } from "../auth.service";
import { StorageService } from "../storage.service";

//define uma classe service
@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class ScriptService{
    constructor(public http: HttpClient,
        public storage :StorageService,
        public auth: AuthService,
        ){
    }

    // findAll(estado_id: string) : Observable<CidadeDTO[]>{
    //     return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    // }

    insert(obj: ScriptDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/treinos/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findAll() : Observable<Content>{
        return this.http.get<Content>(`${API_CONFIG.baseUrl}/treinos`);
    }
}