import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
  }

 logout(){
  this.authService.logout();
 }

}
