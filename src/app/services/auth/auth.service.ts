import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

    cachedRequests: Array<HttpRequest<any>> = [];
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    get isLoggedIn() {

        return this.loggedIn.asObservable();

    }

    constructor(

        private router: Router,
        private api: ApiService,
        private http: HttpClient

    ) {
    }

    public collectFailedRequest(request): void {

        this.cachedRequests.push(request);

    }

    public retryFailedRequests(): void {

        for (let i = 0; i < this.cachedRequests.length; i++) {

            const request: HttpRequest<any> = this.cachedRequests[i];
            this.http.request(request);

        }
    }

    private hasToken() {

        return !!localStorage.getItem('token');

    }

    private setToken(token: string): void {

        localStorage.setItem('token', token);

    }

    private deleteToken(): void {

        localStorage.removeItem('token');

    }

    public getToken(): string {

        return localStorage.getItem('token');
    }

    public login(email: string, password: string): Observable<any> {

        return this.api.authenticate(email, password).map(res => {

            this.setToken(res.access_token);
            this.loggedIn.next(true);
            this.router.navigate(['/']);

        }, error => {

            return Observable.throw(error);

        });
    }

    public refreshToken(): void {

        this.api.refreshAuthToken().subscribe(res => {

                this.setToken(res.data.token);

            }, err => {

                this.logout();
                this.router.navigate(['/login']);

            }
        );
    }

    public logout() {

        this.loggedIn.next(false);
        this.deleteToken();
        this.router.navigate(['/login']);

    }
}
