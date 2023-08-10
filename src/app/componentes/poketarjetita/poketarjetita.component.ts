import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Result } from 'src/app/model/pagina';

@Component({
  selector: 'app-poketarjetita',
  templateUrl: './poketarjetita.component.html',
  styleUrls: ['./poketarjetita.component.css']
})
export class PoketarjetitaComponent implements OnChanges {

  @Input() pokemon: Result | undefined;
  id: string = '0';

  ngOnChanges(changes: SimpleChanges): void {
    this.extraerNumeroPokemon();
  }

  extraerNumeroPokemon(){
    if(this.pokemon){
      this.id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);/*
      if(this.id.length == 1){
        this.id = '00' + this.id;
      } else if(this.id.length == 2){
        this.id = '0' + this.id;
      } else if(this.id.length == 3){
        return;
      }*/
    }
  }

}
