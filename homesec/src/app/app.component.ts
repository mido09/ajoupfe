import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ServerstateService } from './services/serverstate.service';
import { SocketsrvService } from './services/socketsrv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'homesec';
  authentified = false;

  constructor(private ss : ServerstateService, private soc : SocketsrvService) { }

  ngOnInit(): void {

    this.soc.connectSocket();
    this.listenToServerMessages();
    this.ss.getAuthStatus().subscribe((data)=>{
      this.authentified = JSON.parse(JSON.stringify(data));
    });
  }

  listenToServerMessages(){
    this.soc.onNewMessage("auth").subscribe((data)=>{
      this.authentified = data;
    });
  }
}
