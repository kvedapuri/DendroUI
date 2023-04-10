import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';
import { PlantsListComponent } from './components/plants-list/plants-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';


const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    ContactusComponent,
    AboutusComponent,
    AddPlantComponent,
    PlantDetailsComponent,
    PlantsListComponent,
    ForgotPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ValidateEqualModule,
    NgxPaginationModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [httpInterceptorProviders, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }