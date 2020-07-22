import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatagetterService {

  constructor(private httpc: HttpClient) { }

  sendResetRequest() : Observable<any>{
    return this.httpc.get("http://localhost:1300/reset");
  }


  turnOn(){
    return this.httpc.get("http://localhost:1300/setOn");
  }


  turnOff(){
    return this.httpc.get("http://localhost:1300/setOff");
  }

}
