import { Component, OnInit } from '@angular/core';
import { MyUserServiceService } from '../my-user-details.service'
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = { email: null, password: null };
  constructor(private loginService: MyUserServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  loginUser() {
    this.loginService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log('printing the response id' + res.id)
          this.loginService.settingUserId(res.id);
          localStorage.setItem('userId',res.id);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
          alert('Your username or password is not correct');
        }
      );
  }
}
