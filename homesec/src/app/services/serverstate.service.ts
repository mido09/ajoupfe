import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerstateService {

  constructor(private httpc : HttpClient) { }

  getServerState() : Observable<any>{
    return this.httpc.get("http://localhost:1300/getServerState");
  }

  getHomeConfig()  : Observable<any>{
    return this.httpc.get("http://localhost:1300/getHomeConfig");
  } 

  getMobileConfig()  : Observable<any>{
    return this.httpc.get("http://localhost:1300/getMobileConfig");
  }
  
  setHomePosition(position) : Observable<any>{
    var url = "http://localhost:1300/setHomeConfig?lat="+position.latitude+
              "&lon="+position.longitude;
    return this.httpc.get(url);
  }
}
