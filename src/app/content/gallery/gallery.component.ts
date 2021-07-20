import {Component, Input, OnInit} from '@angular/core';
import SwiperCore, {Navigation} from 'swiper/core';
import {ImageTile} from "../image-tile/model/image-tile";

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})


export class GalleryComponent implements OnInit {
  get initialSlide(): number {
    return this._initialSlide;
  }

  set initialSlide(value: number) {
    this._initialSlide = value;
  }


  openSlider: boolean;
  @Input() public imageTile: ImageTile;
  private _initialSlide: number;

  constructor() {
    this.openSlider = false;
    this.imageTile = {
      linkedArticles: [],
      id: 0,
      about: "", articlePath: "", format: "", imageUrl: "", order: [], rootImage: "", title: ""
    }
    this._initialSlide = 0;
  }

  ngOnInit(): void {
  }

  openSlideShow(i: number): void {
    this.initialSlide = i-1;
    this.openSlider = true;
  }
}
