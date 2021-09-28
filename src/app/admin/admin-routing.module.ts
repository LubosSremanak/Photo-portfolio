import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ContentManagementComponent} from "./content-management/content-management.component";
import {AdminGuard} from "./guard/admin/admin.guard";
import {ArticleAddComponent} from "./content-management/article-add/article-add.component";
import {ContentManagementGuard} from "./guard/cms/content-management-guard";
import {ArticleResolver} from "../api/article/resolver/article/article.resolver";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent, canActivate: [AdminGuard],
  },
  {
    path: 'cms',
    component: ContentManagementComponent, canActivate: [ContentManagementGuard]
  },

  {
    path: 'articleAdd',
    component: ArticleAddComponent, canActivate: [ContentManagementGuard]
  },
  {
    path: 'articleEdit/:title',
    resolve: {article: ArticleResolver},
    component: ArticleAddComponent, canActivate: [ContentManagementGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
