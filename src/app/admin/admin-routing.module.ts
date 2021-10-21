import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminGuard} from './guard/admin.guard';
import {ContentManagementGuard} from './content-management/guard/content-management-guard.service';
import {ContentManagementComponent} from './content-management/content-management.component';
import {ArticleAddComponent} from './content-management/article-add/article-add.component';
import {ArticleResolver} from './content-management/resovler/article.resolver';
import {ArticlesResolver} from "../home/resolver/articles.resolver";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'cms',
    component: ContentManagementComponent,
    resolve: {
      articles: ArticlesResolver
    },
    canActivate: [ContentManagementGuard],
  },

  {
    path: 'articleAdd',
    component: ArticleAddComponent,
    canActivate: [ContentManagementGuard],
  },
  {
    path: 'articleEdit/:title',
    resolve: { article: ArticleResolver },
    component: ArticleAddComponent,
    canActivate: [ContentManagementGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
