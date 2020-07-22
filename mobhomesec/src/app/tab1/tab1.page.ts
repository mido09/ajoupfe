import { Component, Input, Host } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pp;

  constructor(@Host() private parent : AppComponent) {
  
  }

}
