import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home-padre',
  templateUrl: './home-padre.component.html',
  styleUrls: ['./home-padre.component.css'],
  providers:[NgbCarouselConfig]
})
export class HomePadreComponent implements OnInit {
 
  public porcentage
  
  ngOnInit(): void {
  }
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);   /**Fotos Random para cambiar a personas */

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    let porcentage:string ="10%"
  }
 
}