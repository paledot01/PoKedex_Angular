import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonComplete, Type } from 'src/app/model/pokemonComplete';
import { PokemonService } from 'src/app/servicios/pokemon.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{
  
  private url_nombre_id: string = 'https://pokeapi.co/api/v2/pokemon/';
  private url_pokemon_descripcion: string = 'https://pokeapi.co/api/v2/pokemon-species/';

  pokemon_completo: PokemonComplete = {};
  id: number = 0;
  altura: number = 0;
  peso: number = 0;
  descripcion: string = '';
  especie: string = '';
  tipos: string[] = [];

  constructor(private route: ActivatedRoute, private pokemonServicio: PokemonService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    });
    this.conseguirPokemonPorNombreId();
    this.conseguirPokemonDescripcion();
  }
  
  conseguirPokemonPorNombreId(): void{
    let list: string[] = [];
    this.pokemonServicio.getPokemonForNombreId(this.id, this.url_nombre_id).subscribe({
      next: respuesta => {
        this.pokemon_completo = respuesta;
        this.altura = this.pokemon_completo.height!/10;
        this.peso = this.pokemon_completo.weight!/10;
        respuesta.types?.forEach(x => {
          list.push('url(../../../assets/imgs/tipos/'+x.type.name+'.png)');
        });
        this.tipos = list;
        console.log(this.pokemon_completo);
        console.log(this.tipos);
      },
      error: e => { 
        console.log(e);
      }
    });
  }
  
  conseguirPokemonDescripcion(): void{
    this.pokemonServicio.getPokemonDescripcion(this.id, this.url_pokemon_descripcion).subscribe({
      next: respuesta => {
        this.especie = respuesta.genera.find((x:any) => x.language.name === 'es').genus;
        this.descripcion = respuesta.flavor_text_entries.find((x:any) => x.language.name === 'es').flavor_text;
        console.log(respuesta);
      },
      error: e => { 
        console.log(e);
      }
    });
  }

}
