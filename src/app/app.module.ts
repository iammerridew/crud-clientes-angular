import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { CustomerFormModule } from './shared/components/customer-form/customer-form.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './pages/customers/customers.service';
import { HereMapComponent } from './shared/components/here-map/here-map.component';
import { HereMapModule } from './shared/components/here-map/here-map.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    CustomerFormModule,
    HttpClientModule,
    HereMapModule,
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
