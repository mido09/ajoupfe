import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MancComponent } from './manc/manc.component';
import { LivestatusComponent } from './livestatus/livestatus.component';
import { ConfigComponent } from './config/config.component';
import { DatagetterService } from './services/datagetter.service';
import { ServerstateService } from './services/serverstate.service';
import { SocketsrvService } from './services/socketsrv.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StrComponent } from './str/str.component';
import { AuthComponent } from './auth/auth.component'
import { AuthserService } from './authser.service';

@NgModule({
  declarations: [
    AppComponent,
    MancComponent,
    LivestatusComponent,
    ConfigComponent,
    StrComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatagetterService, ServerstateService, SocketsrvService, AuthserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
