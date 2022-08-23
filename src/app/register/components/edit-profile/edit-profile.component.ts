import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    //get the current user from behaviour subject
    const currentUser = this.authService.currentUserValue;

    this.editProfileForm = this.formBuilder.group({
      userId: [currentUser.userId],
      firstName: [currentUser.firstName, Validators.required],
      lastName: [currentUser.lastName, Validators.required],
      email: [currentUser.email, [Validators.email, Validators.required]],
      phone: [currentUser.phone, Validators.required],
      password: [currentUser.password, [Validators.required, Validators.minLength(6)]]
    })
  }

  get fval() {
    return this.editProfileForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.editProfileForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.createUser(this.editProfileForm.value).subscribe(data => {
      if (data && data.statusCode == 'CREATED') {
        this.loading = false;
        this.userService.getUserDetailsById(this.fval.userId.value).subscribe(user => {
          if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.authService.currentUserSubject.next(user);

            this.toastrService.success("Details updated successfully", "", {
              timeOut: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['admin-home']);
            }, 3000);
          }
        })
      }
    }
      ,
      error => {
        this.loading = false;
        this.toastrService.error("Error");
      }
    );
  }

}
