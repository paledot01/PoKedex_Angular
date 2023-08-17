import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pagina } from '../model/pagina';
import { Color } from '../model/color';
import { Pokemon } from '../model/pokemon';

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

  getPokemonForColor(color: string, url: string): Observable<Pokemon[]>{
    return this.httpCliente.get<Pokemon[]>(url+color).pipe(map((data: any) => data.pokemon_species));
  }

  getPokemonForTipo(tipo: string, url: string): Observable<Pokemon[]>{
    return this.httpCliente.get<Pokemon[]>(url+tipo).pipe(map((data: any) => data.pokemon.map((pokemon: any) => pokemon.pokemon)));
  }

  getPokemonForNombreId(nombre: string, url: string): Observable<any>{
    return this.httpCliente.get<any>(url+nombre).pipe(map((data: any) => data.id));
  }

  getPokemon(): Observable<any>{
    return this.httpCliente.get<any>(this.url_pokemon);
  }

}
