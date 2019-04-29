import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '#/app-routing.module';
import { AppComponent } from '#/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '##/environments/environment';


import {DemoMaterialModule} from './material.module';

import { MenuComponent } from './components/menu/menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user/user.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { TracksComponent } from './components/tracks/tracks/tracks.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    UserComponent,
    UserLoginComponent,
    TracksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    UserLoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
