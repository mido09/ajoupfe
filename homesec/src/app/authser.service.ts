import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserService {

  constructor(private httpc : HttpClient) { }

  login(body) : Observable<any>{
    return this.httpc.post("http://193.46.198.9:1300/login",body);
  }

  signup(body) : Observable<any>{
    return this.httpc.post("http://193.46.198.9:1300/insertUser",body);
  }

  disconnect() : Observable<any>{
    return this.httpc.post("http://193.46.198.9:1300/disconnect",{});
  }

}
