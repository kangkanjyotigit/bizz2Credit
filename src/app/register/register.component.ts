import { Component, OnInit } from '@angular/core';
import { MyGroceryServiceService } from '../my-grocery-service.service';
import { Router } from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email:null, password:null};
  constructor(private RegisterService: MyGroceryServiceService, private router: Router) { }

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
