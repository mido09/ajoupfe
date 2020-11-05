import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserService } from '../authser.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  checkoutForm;

  constructor(private autsrv : AuthserService, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
   }

  ngOnInit(): void {
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
