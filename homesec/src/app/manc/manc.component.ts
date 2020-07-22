import { Component, OnInit } from '@angular/core';
import { DatagetterService } from '../services/datagetter.service';
import { ServerstateService } from '../services/serverstate.service';

@Component({
  selector: 'manc',
  templateUrl: './manc.component.html',
  styleUrls: ['./manc.component.css']
})
export class MancComponent implements OnInit {

  state = true;

  constructor(private dgs : DatagetterService, private ss : ServerstateService) { }

  ngOnInit(): void {
    this.ss.getServerState().subscribe((data)=>{
      if(data.state=="ON") this.state = false;
      else this.state = true;
    })
  }

  changeState(){
    this.state = !this.state;
    if(this.state){
      this.dgs.turnOff().subscribe((data)=>{
        //console.log("Got response: "+data);
      });
    }
    else{
      this.dgs.turnOn().subscribe((data)=>{
        //console.log("Got response: "+data);
      });
    }
  }

  reset(){
    this.dgs.sendResetRequest().subscribe((data)=>{
      //console.log("Got response: "+data);
    });
  }

}
