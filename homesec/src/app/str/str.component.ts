import { Component, OnInit } from '@angular/core';
import { SocketsrvService } from '../services/socketsrv.service';

@Component({
  selector: 'str',
  templateUrl: './str.component.html',
  styleUrls: ['./str.component.css']
})
export class StrComponent implements OnInit {

  isShown = false;
  msg = "Show Streaming";
  strUrl = "http://192.168.43.225:8081";
  constructor(private soc : SocketsrvService) { }

  ngOnInit(): void {
    this.listenToIpEvent();
  }

  listenToIpEvent(){
    this.soc.onNewMessage("ip").subscribe((data)=>{
      this.strUrl = data;
    });
  }
  changeShown(){
    this.isShown = !this.isShown;
    if(this.isShown)
    {
      this.msg = "Hide Streaming"
    }
    else{
      this.msg = "Show Streaming"
    }
  }

}
