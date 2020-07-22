import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServerstateService } from '../services/serverstate.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  checkoutForm;

  constructor(private formBuilder: FormBuilder, private ss : ServerstateService) {
    this.checkoutForm = this.formBuilder.group({
      latitude: '',
      longitude: ''
    });
   }

  ngOnInit(): void {
  }

  onSubmit(position){
    this.checkoutForm.reset();
    console.log(JSON.stringify(position));
    this.ss.setHomePosition(position).subscribe((data)=>{
      console.log(JSON.stringify(position));
    });
  }

}
