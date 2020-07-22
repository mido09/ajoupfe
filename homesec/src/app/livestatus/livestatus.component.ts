import { Component, OnInit } from '@angular/core';
import { ServerstateService } from '../services/serverstate.service';
import { SocketsrvService } from '../services/socketsrv.service';

@Component({
  selector: 'livestatus',
  templateUrl: './livestatus.component.html',
  styleUrls: ['./livestatus.component.css']
})
export class LivestatusComponent implements OnInit {

  state = "...";
  connected = "...";
  alerting = "...";

  latitude = "...";
  longitude = "...";

  userlongitude = "...";
  userconnected = "...";
  userlatitude = "...";

  constructor(private ss : ServerstateService, private soc : SocketsrvService) { }

  ngOnInit(): void {

    this.soc.connectSocket();
    this.listenToServerMessages();
    this.ss.getServerState().subscribe((data)=>{
      this.alerting = data.alerting;
      this.connected = data.connected;
      this.state = data.state;
    });
    this.ss.getHomeConfig().subscribe((data)=>{
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    })

    this.ss.getMobileConfig().subscribe((data)=>{
      this.userconnected = data.connected;
      this.userlongitude = data.longitude;
      this.userlatitude = data.latitude;
    })
  }
  

  listenToServerMessages(){
    this.soc.onNewMessage("alerting").subscribe((data)=>{
      this.alerting = data;
    });
    this.soc.onNewMessage("connected").subscribe((data)=>{
      this.connected = data;
    });
    this.soc.onNewMessage("state").subscribe((data)=>{
      this.state = data;
    });

    this.soc.onNewMessage("homeconfig").subscribe((data)=>{
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    })

  }

}
