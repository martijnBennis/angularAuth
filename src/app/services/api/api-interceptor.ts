import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {AuthService} from '../auth/auth.service';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq: HttpRequest<any>;
        if (this.auth.getToken()) {
            if (request.url !== environment.onesignalUrl) {
                authReq = request.clone({ setHeaders: {Authorization: 'Bearer ' + this.auth.getToken()}});
                console.log(authReq.method + ': ' + authReq.url);
            } else {
                // console.log(request.headers);
                return next.handle(request);
            }
        } else {
            authReq = request.clone();
        }
        return next.handle(authReq).catch((error, caught) => {
            if (error.status === 401) {
                this.auth.collectFailedRequest(request);
                this.auth.refreshToken();
                this.auth.retryFailedRequests();
            }
            return Observable.throw(error);
        }) as any;
    }
}
