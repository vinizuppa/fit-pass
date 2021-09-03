import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { PerfilDTO } from "../models/perfil.dto";

//Serviço responsável por obter ou armazenar um objeto LocalUser
@Injectable()
export class StorageService{
    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null){
            return null;
        }
        else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    
    setPerfilUser(obj: PerfilDTO){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.perfis);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.perfis, JSON.stringify(obj));
        }
    }
}