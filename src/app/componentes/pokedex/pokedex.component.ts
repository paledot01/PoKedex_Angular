import { Pagina, Result } from 'src/app/model/pagina';
import { PokemonService } from './../../servicios/pokemon.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit, AfterViewInit{


  pagina: Pagina = {};
  resultado: Result[]|undefined = [];
  ids_pokemon: number[] = [];
  urlImagen: string = '';

  constructor(private pokemonServicio: PokemonService){
  }
  ngOnInit(): void {
    this.getPagina();
    this.getOnePokemon();
  }
  ngAfterViewInit() {
    //this.listarPokemon();
  }

  getPagina(): any{
    this.pokemonServicio.getPagina().subscribe({
      next: respuesta => {
        this.pagina = respuesta;
        this.resultado = respuesta.results;
        respuesta.results?.forEach(x => {
          let id: string = x.url.substring(34, x.url.length - 1);
          this.ids_pokemon.push(parseInt(id));
        });
        console.log(this.pagina);
        console.log(this.resultado);
        console.log(this.ids_pokemon);
        //return true;
      },
      error: e => console.log(e)
    });
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
  extraerNumeroPokemon(){
    if(this.resultado){
      this.resultado.forEach(x => {
        let id: string = x.url.substring(34, x.url.length - 1);
        this.ids_pokemon.push(parseInt(id));
      });
      console.log(this.ids_pokemon);
      //this.id_pokemon = this.resultado.url.substring(34, this.resultado.url.length - 1);
    }
  }

}
