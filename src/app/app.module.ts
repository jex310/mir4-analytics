import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UIRouterModule} from "@uirouter/angular";
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {MomentModule} from "ngx-moment";
import {NgChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileLayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    UIRouterModule.forRoot({
      useHash: false,
      states: [
        {
          name: 'profile',
          url: '/user/:ign',
          abstract: true,
          component: ProfileLayoutComponent,
        },
        {
          name: 'profile.user',
          url: '',
          component: ProfileComponent
        }
      ]
    }),
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
