import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KittenPageRoutingModule } from './kitten-routing.module';

import { KittenPage } from './kitten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KittenPageRoutingModule
  ],
  declarations: [KittenPage]
})
export class KittenPageModule {}
