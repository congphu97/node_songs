import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';


@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public valuePassword = ''
    public showPassword: boolean = false

    constructor() { }

    ngOnInit(): void {
    }

    handleResetPw() {
        this.valuePassword = ''
        console.log('running ')
    }

    handleShowPassword() {
        this.showPassword = !this.showPassword
    }
}
