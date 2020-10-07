import { Component, OnInit } from '@angular/core';
import { MyUserServiceService } from '../my-user-details.service';
import { Router } from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email:null, password:null,name:null,Phone: null};
  constructor(private RegisterService: MyUserServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  registerUser() {
   this.RegisterService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          this.RegisterService.settingUserId(res.id);
          localStorage.setItem('userId',res.id);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      );
  }
}
