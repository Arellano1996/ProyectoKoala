import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environments } from '../environments/environments';


const config: SocketIoConfig = {
    url: environments.urlServido, options: { }
}

@NgModule({ 
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    exports: [], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        SocketIoModule.forRoot( config )
    ], 
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
