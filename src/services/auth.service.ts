import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class AuthService{
    constructor(public http: HttpClient, public storage: StorageService){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'//Define que a resposta será um texto e não JSON, já que o endpoint /login não retorna nada como Json, somente no header
            })
    }

    successfulLogin(AuthorizationValue: string){
        let tok = AuthorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}