import { Injectable } from '@angular/core';
import { Article } from '../../api/article/model/article';
import { ImageTile } from '../../shared/image-tile/model/image-tile';
import { Image } from '../../api/article/model/image';

@Injectable({
  providedIn: 'root',
})
export class ArticleManageService {
  constructor() {
    this._articles = [];
  }

  private _articles: Article[];

  get articles(): Article[] {
    return this._articles;
  }

  set articles(value: Article[]) {
    this._articles = value;
  }

  createImageTiles(): ImageTile[] {
    let imageTiles: ImageTile[] = [];
    this.articles.forEach((article: Article) => {
      imageTiles.push({
        about: article.about,
        articlePath: article.title,
        image: this.getRootImage(article)!,
        title: article.title,
      });
    });
    return imageTiles;
  }

  public getRootImage(article: Article): Image | undefined {
    return article.images?.find((image) => image.rootImage);
  }
}
