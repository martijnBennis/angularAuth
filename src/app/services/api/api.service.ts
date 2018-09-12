import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

    apiUrl: string = environment.apiUrl;

    constructor(
        public http: HttpClient,
    ) {
    }

    public get(url: string, options: object = {}): Observable<any> {

        return this.http.get(this.apiUrl + url, options);

    }

    public post(url: string, body: object = {}, options: object = {}): Observable<any> {

        return this.http.post(this.apiUrl + url, body, options);

    }

    public delete(url: string, options: object = {}): Observable<any> {

        return this.http.delete(this.apiUrl + url, options);
    }

    public authenticate(email: string, password: string): Observable<any> {

        return this.http.post(environment.apiUrl + '/api/auth/login', {

            email: email,
            password: password

        }, {});
    }

    public refreshAuthToken(): Observable<any> {

        return this.http.post(this.apiUrl + '', {}, {});

    }
}
