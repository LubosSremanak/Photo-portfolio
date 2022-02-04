import { Component, Input, OnInit } from '@angular/core';
import { ImageTile } from './model/image-tile';
import { Router } from '@angular/router';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 200 }),
    fadeOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export class ImageTileComponent implements OnInit {
  @Input() imageTile: ImageTile | undefined;

  constructor(private router: Router) {
    this._imageHover = false;
  }

  private _imageHover: boolean;

  get imageHover(): boolean {
    return this._imageHover;
  }

  set imageHover(value: boolean) {
    this._imageHover = value;
  }

  ngOnInit(): void {}

  navigate(): void {
    this.router.navigate(['article', this.imageTile?.articlePath]).then();
  }

  async hoverOnTime(): Promise<void> {
    this.imageHover = true;
    await this.delay(2.5);
    this.imageHover = false;
  }

  delay(seconds: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, seconds * 1000);
    });
  }
}
