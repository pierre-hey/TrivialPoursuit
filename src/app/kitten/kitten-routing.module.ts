import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KittenPage } from './kitten.page';

const routes: Routes = [
  {
    path: '',
    component: KittenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KittenPageRoutingModule {}
