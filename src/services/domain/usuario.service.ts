import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { PerfilDTO } from "../../models/perfil.dto";

@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class UsuarioService{
    constructor(public http: HttpClient){
    }

  findPerfilByEmail(email : string) : Observable<PerfilDTO>{
        return this.http.get<PerfilDTO>(`${API_CONFIG.baseUrl}/usuarios/email/?value=${email}`);
    }
}