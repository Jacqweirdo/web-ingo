import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  { path: '', redirectTo: '/historial', pathMatch: 'full' },
  { path: 'historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
