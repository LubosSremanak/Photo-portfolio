import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Lazy, Navigation } from 'swiper/core';
import { Article } from '../../../api/article/model/article';

SwiperCore.use([Navigation, Lazy]);

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  openSlider: boolean;
  @Input() public article: Article | undefined;

  constructor() {
    this.openSlider = false;
    this._initialSlide = 0;
  }

  private _initialSlide: number;

  get initialSlide(): number {
    return this._initialSlide;
  }

  set initialSlide(value: number) {
    this._initialSlide = value;
  }

  ngOnInit(): void {}

  openSlideShow(i: number): void {
    this.initialSlide = i;
    this.openSlider = true;
  }
}
