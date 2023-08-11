import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina } from '../model/pagina';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  //private url_pagina = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  private url_pokemon = 'https://pokeapi.co/api/v2/pokemon/charizard';
  constructor(private httpCliente: HttpClient) { }

  getPagina(url_pagina: string): Observable<Pagina>{
    return this.httpCliente.get<Pagina>(url_pagina);
  }

  getPokemon(): Observable<any>{
    return this.httpCliente.get<any>(this.url_pokemon);
  }

}
