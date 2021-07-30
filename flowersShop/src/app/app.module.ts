import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AddingComponent } from './adding/adding.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { FlipArrayPipe } from './flip-array.pipe';
import { EditingComponent } from './editing/editing.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CartComponent,
    AddingComponent,
    FlipArrayPipe,
    EditingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAqbvfLA1r9wYaBm8BbmKi429Q-XzsylUw",
      authDomain: "fir-flowers-shop.firebaseapp.com",
      databaseURL: "https://fir-flowers-shop-default-rtdb.firebaseio.com",
      projectId: "fir-flowers-shop",
      storageBucket: "fir-flowers-shop.appspot.com",
      messagingSenderId: "248368719171",
      appId: "1:248368719171:web:d4242575b8a8d9acdd3bf6"
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
