import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserService } from '../authser.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  SignInForm;
  SignUpForm;
  constructor(private autsrv : AuthserService, private formBuilder: FormBuilder) {
    this.SignInForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    this.SignUpForm = this.formBuilder.group({
      username: '',
      email: '',
      numero: '',
      password: ''
    });
    
   }
   
  ngOnInit(): void {
     
  }
  onSubmit(login){
    this.SignInForm.reset();
    console.log(JSON.stringify(login));
   
  
    
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
