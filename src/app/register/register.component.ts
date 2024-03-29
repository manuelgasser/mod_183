﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        // this.registerForm = this.formBuilder.group({
        //     firstName: ['', Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
        //     lastName: ['', Validators.required],
        //     username: ['', Validators.required],
        //     password: ['', [Validators.required, Validators.minLength(10)]]
        // });

        this.registerForm = new FormGroup({
            firstName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$')
            ])),
            lastName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z]+$')
            ])),
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            gender: new FormControl('', Validators.compose([
                Validators.required
            ])),
            age: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]*$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(10)
            ])),
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration erfolgreich', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
