import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppComponent } from './app.component';
import { FooterModule } from './layout';
import { ChangePasswordFormModule, LoginFormModule } from './login';
import { AppRoutingModule } from './app-routing.module';
import { PpCoreModule } from './pp-core/pp-core.module';
import { MainLayoutModule } from './layout/main-layout';
import { UnauthenticatedContentModule } from './layout/unauthenticated-content';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PpCoreModule,
    MainLayoutModule,
    FooterModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
