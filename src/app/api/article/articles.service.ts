import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './model/article';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly url: string;
  private readonly options: any;

  constructor(private http: HttpClient) {
    this.url = 'http://lubossremanak.com.d.r2.wbsprt.com/api/controllers/article/ArticlesController.php';
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getArticle(title: string): Observable<HttpEvent<Article>> {
    const url: string = this.url + '?title=' + title;
    return this.http.get<Article>(url, this.options);
  }

  getArticles(): Observable<HttpEvent<Article[]>> {
    return this.http.get<Article[]>(this.url, this.options);
  }

  createArticle(article: Article): Observable<HttpEvent<string>> {
    return this.http.post<string>(this.url, article, this.options);
  }

  editArticle(article: Article): Observable<HttpEvent<string>> {
    return this.http.put<string>(this.url, article, this.options);
  }

  reorderArticles(articles: Article[]): Observable<HttpEvent<string>> {
    const url: string = this.url + '?order=true';
    return this.http.put<string>(url, articles, this.options);
  }

  deleteArticle(title: string): Observable<HttpEvent<string>> {
    const url: string = this.url + '?title=' + title;
    return this.http.delete<string>(url, this.options);
  }

  deleteArticleImage(
    title: string,
    path: string
  ): Observable<HttpEvent<string>> {
    let url: string = this.url + '?title=' + title;
    url += '&path=' + path;
    return this.http.delete<string>(url, this.options);
  }
}
