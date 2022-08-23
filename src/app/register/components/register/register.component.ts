import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private toasterService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
console.log(this.activatedRoute.queryParams);
  

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get fval() {
    return this.registerForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.createUser(this.registerForm.value).subscribe(data => {
      if (data && data.statusCode == 'CREATED') {
        this.loading = false;
        this.toasterService.success("Registration successful", "", {
          timeOut: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 3000);

      }
    }
      ,
      error => {
        this.loading = false;
        this.toasterService.error("Error");
      }
    );
  }

}
