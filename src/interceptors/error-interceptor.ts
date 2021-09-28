import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401:
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;

                case 422:
                    this.handle422(errorObj);
                    break   

                default:
                    this.handleDefaultEror(errorObj);    
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação',//titulo do alert
            message: 'Email ou senha incorretos',//mensagem do alert
            enableBackdropDismiss: false, //para sair do alert tem que apertar no botão do alert
            buttons: [//lista de botões, definindo como objeto
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present(); //Apresenta o alert
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle422(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false, //para sair do alert tem que apertar no botão do alert
            buttons: [//lista de botões, definindo como objeto
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present(); //Apresenta o alert
    }

    handleDefaultEror(error){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + error.status + ': ' + error.error,//titulo do alert
            message: error.message,//mensagem do alert
            enableBackdropDismiss: false, //para sair do alert tem que apertar no botão do alert
            buttons: [//lista de botões, definindo como objeto
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present(); //Apresenta o alert
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};