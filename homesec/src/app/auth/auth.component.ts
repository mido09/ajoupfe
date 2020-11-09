import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserService } from '../authser.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  LoginForm;
  SignUpForm;
  constructor(private autsrv : AuthserService, private formBuilder: FormBuilder) {
    this.LoginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.SignUpForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      card:''
    });
    
   }
   
  ngOnInit(): void {
     
  }
  onSubmit(login){
    this.LoginForm.reset();
    console.log(JSON.stringify(login));    
    this.auth()
  }

  logIn(login){
    this.LoginForm.reset();
    console.log(JSON.stringify(login));    
    this.autsrv.login(login).subscribe((data)=>{
      if(!data.isAuth){
        alert("Wrong credentials");
      }
    })
  }

  signUp(sign){
    this.SignUpForm.reset();
    console.log(JSON.stringify(sign));    
    this.autsrv.signup(sign).subscribe((data)=>{
      alert("User Created successfully, You can login into your account");
    })
  }
  auth(){
    let body = {};
    this.autsrv.login(body).subscribe((data)=>{

    });
  }
  disconnect(){
    let body = {};
    this.autsrv.disconnect().subscribe((data)=>{
      
    });
  }

}
