import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePatternComponent } from './article-pattern/article-pattern.component';
import {ArticleResolver} from "../admin/content-management/resovler/article.resolver";

const routes: Routes = [
  {
    path: ':title',
    component: ArticlePatternComponent,
    resolve:{article:ArticleResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
