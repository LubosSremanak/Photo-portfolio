import {Injectable} from '@angular/core';
import {ImageTile} from "../image-tile/model/image-tile";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  readonly prefix: string = '';

  constructor() {
    this._imageTiles = [
      {
        id: 1,
        about: 'Photo content from a short fashion film',
        title: '\"The Visitor\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/THE-VISITOR/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        linkedArticles: ['\"A LIFE IN A DAY\"', '\"TEMPTATION\"']
      },
      {
        id: 2,
        about: 'When in lockdown',
        title: '\"A LIFE IN A DAY\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/A-LIFE-IN-A-DAY/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        linkedArticles: ['\"AS I AM\"', '\"TEMPTATION\"']
      }
      ,
      {
        id: 3,
        about: 'Photo content from a short fashion film',
        title: '\"TEMPTATION\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/TEMPTATION/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7],
        linkedArticles: ['\"AS I AM\"', '\"B-YOU-T\"']
      },
      {
        id: 4,
        about: 'Editorial for Slippage Magazine in collaboration with Francesca Russo',
        title: '\"AS I AM\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/AS-I-AM/',
        rootImage: '1',
        format: '.JPG',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        ,
        linkedArticles: ['\"WHERE THE SUN COMES UP\"', '\"B-YOU-T\"']
      },
      {
        id: 5,
        about: 'Photo content from a short fashion film',
        title: '\"B-YOU-T\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/B-YOU-T/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5],
        linkedArticles: ['\"WHERE THE SUN COMES UP\"', '\"TRANSFORMATION OF TRADITIONS\"']
      },
      {
        id: 6,
        about: 'Fashion editorial featuring Michaela Luptakova\'s designs',
        title: '\"WHERE THE SUN COMES UP\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/WHERE-THE-SUN-COMES-UP/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        linkedArticles: ['\"RISE OF SEA LEVEL\"', '\"TRANSFORMATION OF TRADITIONS\"']
      },
      {
        id: 7,
        about: 'Sustainably Radical',
        title: '\"TRANSFORMATION OF TRADITIONS\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/TRANSFORMATION-OF-TRADITIONS/',
        rootImage: '1',
        format: '.JPG',
        articlePath: 'article-pattern',
        order: [1, 2, 3, 4, 5, 6, 7, 8],
        linkedArticles: ['\"RISE OF SEA LEVEL\"', '\"The Visitor\"']
      },
      {
        id: 8,
        about: 'Short experimental series',
        title: '\"RISE OF SEA LEVEL\"',
        imageUrl: '../../../'+this.prefix+'assets/photos/RISE-OF-SEA-LEVEL/',
        rootImage: '1',
        format: '.jpg',
        articlePath: 'article-pattern',
        order: [1, 2, 3],
        linkedArticles: ['\"A LIFE IN A DAY\"', '\"The Visitor\"']
      }
    ];
  }

  private _imageTiles: ImageTile[];
  get imageTiles(): ImageTile[] {
    return this._imageTiles;
  }

  set imageTiles(value: ImageTile[]) {
    this._imageTiles = value;
  }

  getImageTileByTitle(title: string | null): ImageTile {
    return <ImageTile>this.imageTiles.find(x => x.title === title);
  }
}
