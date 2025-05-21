import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { MaterialModule } from './shared/material/material.module';
import { ContactComponent } from './shared/components/contact/contact.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AboutComponent } from './shared/components/about/about.component';
import { ProductsDashboardComponent } from './shared/components/products-dashboard/products-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swiper from 'swiper';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductsShowcaseComponent } from './shared/components/products-showcase/products-showcase.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthComponent,
    ContactComponent,
    FooterComponent,
    AboutComponent,
    ProductsDashboardComponent,
    CarouselComponent,
    ProductCardComponent,
    ProductsShowcaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
