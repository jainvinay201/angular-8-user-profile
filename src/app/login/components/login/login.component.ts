import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: any = 200;
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
      this.router.navigate(['admin-home']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get fval() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.fval.email.value, this.fval.password.value)
      .subscribe(res => {
        if (res)
          this.getUserDetails();

      },
        error => {
          this.toasterService.error(error.error.message, 'Error');
          this.loading = false;
        }

      )
  }

  getUserDetails() {
    this.authenticationService.getUserDetails(this.fval.email.value, this.fval.password.value)
      .subscribe(user => {
        this.router.navigate(['admin-home']);
      })
  }

}
