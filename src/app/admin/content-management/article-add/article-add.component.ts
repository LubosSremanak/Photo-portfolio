import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../../api/article/model/article';
import {ArticlesService} from '../../../api/article/articles.service';
import {ImageManagerService} from './image-manager/service/image-manager.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
})


export class ArticleAddComponent implements OnInit {
  type: 'Edit' | 'Add';
  articleTitle: string | undefined;
  data!: FormGroup;
  articlesSelect: Article[] | undefined;
  private readonly titleBeforeEdit: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router,
    private imageService: ImageManagerService
  ) {
    this.articlesService.getArticles().subscribe(this.handleArticles);
    const routeParams = this.route.snapshot.paramMap;
    const articleTitle = routeParams.get('title');
    this.type = 'Add';
    if (articleTitle) {
      this.type = 'Edit';
      this.titleBeforeEdit = articleTitle;
      this.articleTitle = articleTitle;
    }

    this.route.data.subscribe(this.handleArticle);
  }

  get title() {
    return this.data.get('title');
  }

  ngOnInit(): void {
  }

  isValid(name: any): boolean {
    return name.invalid && (name.dirty || name.touched);
  }

  updateArticle(data: FormGroup) {
    if (!data.valid) {
      data.markAllAsTouched();
      return;
    }
    const article = this.createArticle(data);
    if (this.type === 'Add') {
      this.articlesService
        .createArticle(article)
        .subscribe(this.handleChangedArticle);
    }
    if (this.type === 'Edit') {
      this.articlesService
        .editArticle(article)
        .subscribe(this.handleChangedArticle);
    }
  }

  createArticle(data: FormGroup): Article {
    const value = data.value;
    const order = this.articlesSelect ? this.articlesSelect.length + 1 : null;
    const titleBeforeEdit = this.titleBeforeEdit
      ? this.titleBeforeEdit
      : value.title;
    return {
      about: value.about,
      images: this.imageService.images,
      nextArticleTitle1: value.nextArticleTitle1,
      nextArticleTitle2: value.nextArticleTitle2,
      title: value.title,
      titleBeforeEdit,
      order,
    };
  }

  private handleArticle = (data: any): void => {
    let article: Article = data.article as Article;
    if (!article) {
      article = this.createDefaultArticle();
    }
    this.data = this.createArticleFormGroup(article);
  };

  private createArticleFormGroup = (article: Article): FormGroup => {
    this.imageService.images = article.images ? article.images : [];
    return new FormGroup({
      title: new FormControl(article.title, [Validators.required]),
      about: new FormControl(article.about, []),
      nextArticleTitle1: new FormControl(article.nextArticleTitle1, []),
      nextArticleTitle2: new FormControl(article.nextArticleTitle2, []),
    });
  };

  private createDefaultArticle = (): Article => ({
    about: '',
    images: [],
    nextArticleTitle1: '',
    nextArticleTitle2: '',
    order: null,
    title: '',
    titleBeforeEdit: null,
  });

  private handleArticles = (articles: any): void => {
    this.articlesSelect = articles as unknown as Article[];
  };

  private handleChangedArticle = (): void => {
    this.router.navigate(['admin/cms']).then();
  };

}
