import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticlesService} from "../../../api/article/articles.service";
import {HttpEvent} from "@angular/common/http";
import {Article} from "../../../api/article/model/article";

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<HttpEvent<Article>> {
  constructor(private articlesService: ArticlesService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HttpEvent<Article>> {
    const title = route.paramMap.get('title');
    return this.articlesService.getArticle(title as string);
  }
}
