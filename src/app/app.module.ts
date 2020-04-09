import { BrowserModule } from '@angular/platform-browser';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastService } from 'ng-uikit-pro-standard';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AppRoutes } from './app.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/extra-services/interceptor.service';
import { ShareModule } from './share/share.module';
import { MODULES_NEBULAR } from './nebular/nebular.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutes,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    ShareModule.forRoot(),
    ...MODULES_NEBULAR
  ],
  providers: [MDBSpinningPreloader, ToastService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }

