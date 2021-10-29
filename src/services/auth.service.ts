import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { PerfilDTO } from "../models/perfil.dto";
import { UsuarioService } from "./domain/usuario.service";
import { StorageService } from "./storage.service";

@Injectable()//Anotação para poder injetar essa classe em demais arquivos
export class AuthService{
    jwtHelper: JwtHelper = new JwtHelper();
    perfil: PerfilDTO;
    localPerfil: PerfilDTO;

    constructor(public http: HttpClient, 
        public storage: StorageService,
        public usuarioService: UsuarioService,){

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

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfulLogin(AuthorizationValue: string){
        let tok = AuthorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.usuarioService.findPerfilByEmail(user.email).subscribe(response =>{
            this.storage.setPerfilUser(response)
          })
    }

    logout(){
        this.storage.setPerfilUser(null);
        this.storage.setLocalUser(null);
    }

}