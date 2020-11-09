import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthserService } from './authser.service';
import { ServerstateService } from './services/serverstate.service';
import { SocketsrvService } from './services/socketsrv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'homesec'
  authentified = false;
  name  = ""

  constructor( private ss : ServerstateService, private soc : SocketsrvService, private autsrv : AuthserService) { }

  ngOnInit(): void {
   
    this.soc.connectSocket();
    this.listenToServerMessages();
    this.ss.getAuthStatus().subscribe((data)=>{
      this.authentified = JSON.parse(JSON.stringify(data)).isAuth;
     
    });
  }
  

  listenToServerMessages(){
    this.soc.onNewMessage("auth").subscribe((data)=>{
      this.authentified = data.isAuth;
      this.name = data.user;
    });
  }

  disconnect(){
    let body = {};
    this.autsrv.disconnect().subscribe((data)=>{
      
    });
  }
  
}
