import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './componentes/pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http' // <----- agregado
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <----- agregado
import { NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from './componentes/loading/loading.component';
import { PoketarjetitaComponent } from './componentes/poketarjetita/poketarjetita.component';
import { PokeHeaderComponent } from './componentes/poke-header/poke-header.component';
import { PokeFooterComponent } from './componentes/poke-footer/poke-footer.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    LoadingComponent,
    PoketarjetitaComponent,
    PokeHeaderComponent,
    PokeFooterComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, // <----- agregado para los formularios
    NgOptimizedImage // <----- agregado para las imagenes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
