import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Result } from 'src/app/model/pagina';

@Component({
  selector: 'app-poketarjetita',
  templateUrl: './poketarjetita.component.html',
  styleUrls: ['./poketarjetita.component.css']
})
export class PoketarjetitaComponent implements OnChanges {

  //@Input() pokemon: Result | undefined;
  @Input() id_pokemon: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    //this.extraerNumeroPokemon();
  }
/*
  extraerNumeroPokemon(){
    if(this.pokemon){
      this.id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);
    }
  }*/

}
