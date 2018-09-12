import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {AuthService} from '../../services/auth/auth.service';
import {FormGroup, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {LoginModel} from '../../models/user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: LoginModel = new LoginModel();
    errorMessage: string;

    constructor(
        private api: ApiService,
        private auth: AuthService,
    ) {
    }

    ngOnInit() {
    }

    submitForm(form: NgForm): void {

        this.loginUser();

    }

    loginUser() {

        this.auth.login(this.model.email, this.model.password).subscribe(res => {

            console.log(res);

        }, err => {

            console.log(err);

        });
    }
}
