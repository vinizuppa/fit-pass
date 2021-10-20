import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { InstrutorDTO } from "../../models/instrutor.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class InstrutorService{
    constructor(public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService){
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

    uploadPicture(picture){
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file',pictureBlob, 'file.png');    

        return this.http.post(
            `${API_CONFIG.baseUrl}/instrutores/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}