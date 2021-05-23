import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedNotesComponent } from './presentation/advanced-notes.component';

const routes: Routes = [
  {
    path: 'advanced-notes',
    component: AdvancedNotesComponent
  },
  {
    path: '**', // Redirect all routes
    redirectTo: 'advanced-notes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
