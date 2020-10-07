import { Injectable } from '@angular/core';
import {HttpClient,HttpInterceptor} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MyUserServiceService  {

  public currentUserId;

  constructor(private http:HttpClient) { }
  loginUser(user){
    return this.http.post<any>('http://localhost:6000/login',user);
  }
  registerUser(user) {
    return this.http.post<any>('http://localhost:5000/register', user);
  }
  settingUserId(id) {
    this.currentUserId = id;

  }
  getAlluser(){
    return this.http.get('http://localhost:6000/api/v1/users').subscribe();
  }
}
