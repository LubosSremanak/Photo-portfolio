import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PhotosService} from "../photos.service";
import {ActivatedRoute} from "@angular/router";
import {ImageTile} from "../../image-tile/model/image-tile";

@Component({
  selector: 'app-article-pattern',
  templateUrl: './article-pattern.component.html',
  styleUrls: ['./article-pattern.component.css']
})
export class ArticlePatternComponent implements OnInit {


  constructor(private photosService: PhotosService,
              private route: ActivatedRoute) {

  }

  private _imageTile: ImageTile | undefined;

  get imageTile(): ImageTile {
    return <ImageTile>this._imageTile;
  }

  set imageTile(value: ImageTile) {
    this._imageTile = value;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const kkt1 = params['title'];
      this.imageTile = this.photosService.getImageTileByTitle(kkt1);
    });
  }
    getLinkedArticles(): ImageTile[] {
    const articles: ImageTile[] = [];
    articles.push(this.photosService.getImageTileByTitle(this.imageTile.linkedArticles[0]));
    articles.push(this.photosService.getImageTileByTitle(this.imageTile.linkedArticles[1]));
    return articles;
  }
}
