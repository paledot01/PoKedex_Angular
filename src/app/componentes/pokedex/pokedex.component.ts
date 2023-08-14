import { Pagina, Result } from 'src/app/model/pagina';
import { PokemonService } from './../../servicios/pokemon.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit, AfterViewInit{

  private url_pagina: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

  @ViewChild('modal') modal!: ElementRef;
  pagina: Pagina ={};
  resultado: Result[]|undefined = [];
  ids_pokemon: number[] = [];
  urlImagen: string = '';

  constructor(private pokemonServicio: PokemonService, private renderer: Renderer2){
  }
  ngOnInit(): void {
    this.conseguirPagina();
    this.getOnePokemon();
  }
  ngAfterViewInit() {
    //this.listarPokemon();
  }

  conseguirPagina(): any{
    this.pokemonServicio.getPagina(this.url_pagina).subscribe({
      next: respuesta => {
        this.pagina = respuesta;
        this.resultado = respuesta.results;/*
        respuesta.results?.forEach(x => {
          let id: string = x.url.substring(34, x.url.length - 1);
          this.ids_pokemon.push(parseInt(id));
        });*/
        console.log(this.pagina);
        console.log(this.resultado);
        console.log(this.ids_pokemon);
        //return true;
      },
      error: e => console.log(e)
    });
  }

  conseguirPaginaSiguiente(): any{
    if(this.pagina.next == null){
      return;
    }else{
      this.url_pagina = this.pagina.next;
      this.conseguirPagina();
    }
  }

  conseguirPaginaAnterior(): any{
    if(this.pagina.previous == null){
      return;
    }else{
      this.url_pagina = this.pagina.previous;
      this.conseguirPagina();
    }
  }

  getOnePokemon(): any{
    this.pokemonServicio.getPokemon().subscribe({
      next: respuesta => {
        console.log(respuesta);
        //this.urlImagen = respuesta.sprites.front_default;
        //console.log(this.urlImagen);
        //return true;
      },
      error: e => console.log(e)
    });
  }

  openModal(): void{
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }
  closeModal(): void{
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

}
