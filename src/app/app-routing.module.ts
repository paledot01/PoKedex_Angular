import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './componentes/pokedex/pokedex.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';

const routes: Routes = [
  {path: 'home', component : PokedexComponent},
  { path: 'detalle/:id', component: DetallesComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
