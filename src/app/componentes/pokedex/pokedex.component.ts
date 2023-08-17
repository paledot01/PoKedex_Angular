import { Pagina, Result } from 'src/app/model/pagina';
import { PokemonService } from './../../servicios/pokemon.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Color } from 'src/app/model/color';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit, AfterViewInit{

  private url_pagina: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
  private url_color: string = 'https://pokeapi.co/api/v2/pokemon-color/';
  private url_tipo: string = 'https://pokeapi.co/api/v2/type/';
  private url_nombre_id: string = 'https://pokeapi.co/api/v2/pokemon/';

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('modal_color') modalColor!: ElementRef;
  @ViewChild('modal_tipo') modalTipo!: ElementRef;/*
  @ViewChild('label_color') labelColor!: ElementRef;
  @ViewChild('label_tipo') labelTipo!: ElementRef;*/

  pagina: Pagina ={};
  resultado: Result[]|undefined = [];
  pokemones: Pokemon[] = [];
  result_color: Color = {};
  ids_pokemones: number[] = [];
  ids_pokemones_full: number[] = [];
  total_paginas: number = 65;
  pagina_actual: number = 0;

  // busqueda
  color: string = 'color';
  tipo: string = 'type';
  nombre_pokemon: string = '';
  // error
  mensaje: string = '';

  constructor(private pokemonServicio: PokemonService, private renderer: Renderer2){
  }
  ngOnInit(): void {
    this.conseguirPagina();
    //this.getOnePokemon();
  }
  ngAfterViewInit() {
    //this.listarPokemon();
  }

  conseguirPagina(): any{ //251> nova
    let lista: number[] = [];
    this.pokemonServicio.getPagina(this.url_pagina).subscribe({
      next: respuesta => {
        this.pagina = respuesta;/*
        this.resultado = respuesta.results;*/
        respuesta.results?.forEach(x => {
          let id: number = parseInt(x.url.substring(34, x.url.length - 1));
          lista.push(id);
        });
        this.ids_pokemones = lista;
        console.log(this.pagina);
      },
      error: e => console.log(e)
    });
  }

  conseguirPokemonesPorColor():any{
    let list: number[] = [];
    this.pokemonServicio.getPokemonForColor(this.color, this.url_color).subscribe({
      next: respuesta => {
        //this.pokemones = respuesta;
        respuesta.forEach(x => {
          let id: number = parseInt(x.url.substring(42, x.url.length - 1));
          if(id <= 251){list.push(id)};
        });
        this.ids_pokemones_full = list; // obtenemos lista completa de pokemones
        this.total_paginas = Math.ceil(this.ids_pokemones_full.length / 20); // obetenemos el total de paginas
        this.conseguirPaginaPorColor(0); // le damos los valores de la pagina 1 (0)
        this.pagina_actual = 0; // regresamos la pagina al inicio
        console.log(this.ids_pokemones_full.length + " - " + this.total_paginas);
      },
      error: e => console.log(e)
    });
  }

  conseguirPaginaPorColor(i:number):any{ // obtenemos el arreglo de pokemones de la pagina
    this.ids_pokemones = this.ids_pokemones_full.slice(i*20, i*20+20); // cortamos el arreglo
  }

  conseguirPokemonesPorTipo():any{
    let list: number[] = [];
    this.pokemonServicio.getPokemonForTipo(this.tipo, this.url_tipo).subscribe({
      next: respuesta => {
        console.log(respuesta);
        respuesta.forEach(x => {
          let id: number = parseInt(x.url.substring(34, x.url.length - 1));
          if(id <= 251){list.push(id)};
        });
        this.ids_pokemones_full = list; // obtenemos lista completa de pokemones
        this.total_paginas = Math.ceil(this.ids_pokemones_full.length / 20); // obetenemos el total de paginas
        this.conseguirPaginaPorColor(0); // le damos los valores de la pagina 1 (0)
        this.pagina_actual = 0; // regresamos la pagina al inicio
        console.log(this.ids_pokemones_full);
        console.log(this.ids_pokemones_full.length + " - " + this.total_paginas);
      },
      error: e => console.log(e)
    });
  }

  conseguirPokemonPorNombreId(): void{
    let list: number[] = [];
    this.pokemonServicio.getPokemonForNombreId(this.nombre_pokemon, this.url_nombre_id).subscribe({
      next: respuesta => {
        console.log(respuesta);
        list.push(respuesta);
        this.ids_pokemones = list; // obtenemos lista completa de pokemones
        this.total_paginas = 1; // obetenemos el total de paginas
        //this.conseguirPaginaPorColor(0); // le damos los valores de la pagina 1 (0)
        this.pagina_actual = 0; // regresamos la pagina al inicio
        console.log(this.ids_pokemones);
        console.log(this.ids_pokemones.length + " - " + this.total_paginas);
      },
      error: e => {
        this.ids_pokemones = [];
        this.pagina_actual = -1;
        this.total_paginas = 0;
        this.mensaje = e.error;
      }
    });
  }

  buscarPokemon(): any{
    this.mensaje = ""; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    if(this.nombre_pokemon === '' && this.color === 'color' && this.tipo === 'type'){
      this.conseguirPagina();
    }else if(this.nombre_pokemon !== ''){
      this.conseguirPokemonPorNombreId();
    }else if(this.color !== 'color'){
      this.conseguirPokemonesPorColor();
    }else if(this.tipo !== 'type'){
      this.conseguirPokemonesPorTipo();
    }
  }

  conseguirPaginaSiguiente(): any{
    if(this.nombre_pokemon === '' && this.color === 'color' && this.tipo === 'type'){
      if(this.pagina.next == null){
        return;
      }else{
        this.url_pagina = this.pagina.next;
        this.conseguirPagina();
      }
    } else if(this.color !== 'color' && this.pagina_actual < this.total_paginas-1){
      this.pagina_actual++;
      this.conseguirPaginaPorColor(this.pagina_actual);
    } else if(this.tipo !== 'type' && this.pagina_actual < this.total_paginas-1){
      this.pagina_actual++;
      this.conseguirPaginaPorColor(this.pagina_actual);
    }

  }

  conseguirPaginaAnterior(): any{
    if(this.nombre_pokemon === '' && this.color === 'color' && this.tipo === 'type'){
      if(this.pagina.previous == null){
        return;
      }else{
        this.url_pagina = this.pagina.previous;
        this.conseguirPagina();
      }
    } else if(this.color !== 'color' && this.pagina_actual > 0){
      this.pagina_actual--;
      this.conseguirPaginaPorColor(this.pagina_actual);
    } else if(this.tipo !== 'type' && this.pagina_actual > 0){
      this.pagina_actual--;
      this.conseguirPaginaPorColor(this.pagina_actual);
    }
  }

  getOnePokemon(): any{
    this.pokemonServicio.getPokemon().subscribe({
      next: respuesta => {
        console.log(respuesta);
      },
      error: e => console.log(e)
    });
  }

  limpiarBusqueda(): void{
    this.color = 'color';
    this.tipo = 'type';
    this.nombre_pokemon = '';
  }

  /* ==> Modal  */
  openModalColor(): void{
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.modalColor.nativeElement, 'display', 'block');
    this.limpiarBusqueda();
  }
  openModalTipo(): void{
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.modalTipo.nativeElement, 'display', 'block');
    this.limpiarBusqueda();
  }
  closeModal(): void{
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.modalColor.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.modalTipo.nativeElement, 'display', 'none');
    console.log(this.color);
  }

}
