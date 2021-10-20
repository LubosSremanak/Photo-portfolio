import { Component, Input, OnInit } from '@angular/core';
import { ImageTile } from '../image-tile/model/image-tile';

@Component({
  selector: 'app-article-footer',
  templateUrl: './article-footer.component.html',
  styleUrls: ['./article-footer.component.css'],
})
export class ArticleFooterComponent implements OnInit {
  @Input() articlesToSee: ImageTile[] | undefined;

  constructor() {}

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
