import { Component, OnInit } from '@angular/core';
import { KittenService } from '../services/kitten.service';

@Component({
  selector: 'app-kitten',
  templateUrl: './kitten.page.html',
  styleUrls: ['./kitten.page.scss'],
})
export class KittenPage implements OnInit {
  imgCat: string = '';
  gifCat: string = ' https://cataas.com/cat/gif';
  constructor( private kittenService: KittenService) { }

  ngOnInit() {
    this.displayCat();
  }




  async displayCat() {
    // Troisième manière de faire avec async await
    try {
      this.imgCat = await this.kittenService.getCat2();
      console.log("image de chat : " + this.imgCat);
    } catch (error) {
      console.log(error);
    }
  }


  
}
