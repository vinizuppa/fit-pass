import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { InstrutorDTO } from "../../models/instrutor.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class InstrutorService{
    constructor(public http: HttpClient, public storage: StorageService){
    }

    findByEmail(email: string): Observable<InstrutorDTO>{
        return this.http.get<InstrutorDTO>( `${API_CONFIG.baseUrl}/instrutores/email/?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/ins${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: InstrutorDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/instrutores`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}