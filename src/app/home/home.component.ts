import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleManageService } from '../article/service/article-manage.service';
import { ImageTile } from '../shared/image-tile/model/image-tile';
import { AdminStatusService } from '../core/admin-status/service/admin-status.service';
import { Article } from '../api/article/model/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private articlesService: ArticleManageService,
    private route: ActivatedRoute,
    private adminStatusService: AdminStatusService
  ) {
    this.route.data.subscribe(this.handleArticles);
  }

  get articlesArray(): number[] {
    return [
      ...Array(Math.round(this.articlesService.articles.length / 2)).keys(),
    ];
  }

  get imageTiles(): ImageTile[] {
    return this.articlesService.createImageTiles();
  }

  ngOnInit(): void {}

  private handleArticles = (data: any): void => {
    this.articlesService.articles = data.articles as unknown as Article[];
  };

  public isAdminOpen(): boolean {
    return this.adminStatusService.isOpen;
  }
}
