import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageTile} from '../../shared/image-tile/model/image-tile';
import {Article} from '../../api/article/model/article';
import {HttpEvent} from '@angular/common/http';
import {ArticleManageService} from '../service/article-manage.service';
import {ArticlesService} from '../../api/article/articles.service';

@Component({
  selector: 'app-article-pattern',
  templateUrl: './article-pattern.component.html',
  styleUrls: ['./article-pattern.component.css'],
})
export class ArticlePatternComponent implements OnInit {
  private readonly _linkedArticles: ImageTile[];

  constructor(
    private articleService: ArticlesService,
    private articlesManageService: ArticleManageService,
    private route: ActivatedRoute,
    private changeDetector:ChangeDetectorRef
  ) {
    this._linkedArticles = [];
    this.route.data.subscribe(this.handleArticles);
  }

  private _article: Article | undefined;

  get article(): Article | undefined {
    return this._article;
  }

  get linkedArticles(): ImageTile[] {
    return this._linkedArticles;
  }

  ngOnInit(): void {
    this.getLinkedArticles();
  }

  getLinkedArticles(): void {
    const articleTitle1: string | null = this._article?.nextArticleTitle1!;
    const articleTitle2: string | null = this._article?.nextArticleTitle2!;
    this.articleService
      .getArticle(articleTitle1)
      .subscribe(this.handleLinkedArticles);
    this.articleService
      .getArticle(articleTitle2)
      .subscribe(this.handleLinkedArticles);
  }

  handleLinkedArticles = (articleResponse: HttpEvent<Article>): void => {
    const article: Article = articleResponse as unknown as Article;
    if (article.title) {
      this.linkedArticles.push({
        about: article.about,
        articlePath: article.title,
        image: this.articlesManageService.getRootImage(article)!,
        title: article.title,
      });
      this.changeDetector.detectChanges();
    }

  };

  private handleArticles = (data: any): void => {
    this._article = data.article;
  };
}
