import { FiltersService } from './shared/services/filters.service';
import { ResponseService } from './shared/services/response.service';
import { RestApiService } from './shared/services/rest-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemCardComponent } from './item-card/item-card.component';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    ItemPageComponent,
    ItemCardComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  providers: [
    RestApiService,
    ResponseService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
