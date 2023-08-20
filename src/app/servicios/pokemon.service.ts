import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pagina } from '../model/pagina';
import { Color } from '../model/color';
import { Pokemon } from '../model/pokemon';
import { PokemonComplete } from '../model/pokemonComplete';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  private url_pokemon = 'https://pokeapi.co/api/v2/pokemon/charizard';

  constructor(private httpCliente: HttpClient) { }

  
  getPokemonesAll(url_pagina: string): Observable<Pagina>{
    return this.httpCliente.get<Pagina>(url_pagina);
  }

  getPokemonForColor(color: string, url: string): Observable<Pokemon[]>{
    return this.httpCliente.get<Pokemon[]>(url+color).pipe(map((data: any) => data.pokemon_species));
  }

  getPokemonForTipo(tipo: string, url: string): Observable<Pokemon[]>{
    return this.httpCliente.get<Pokemon[]>(url+tipo).pipe(map((data: any) => data.pokemon.map((pokemon: any) => pokemon.pokemon)));
  }

  getPokemonForNombreId(nombre: string|number, url: string): Observable<PokemonComplete>{
    //return this.httpCliente.get<any>(url+nombre).pipe(map((data: any) => data.id));
    return this.httpCliente.get<PokemonComplete>(url+nombre);
  }

  getPokemonDescripcion(nombre: string|number, url: string): Observable<any>{
    return this.httpCliente.get<any>(url+nombre);
  }

  getPokemon(): Observable<any>{
    return this.httpCliente.get<any>(this.url_pokemon);
  }

}
