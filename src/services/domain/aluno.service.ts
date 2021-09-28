import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { AlunoDTO } from "../../models/aluno.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class AlunoService{
    constructor(public http: HttpClient, public storage: StorageService){
    }

    findByEmail(email: string): Observable<AlunoDTO>{
        return this.http.get<AlunoDTO>( `${API_CONFIG.baseUrl}/alunos/email/?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/al${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: AlunoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/alunos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}