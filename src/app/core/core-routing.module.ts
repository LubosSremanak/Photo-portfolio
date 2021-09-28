import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ArticlesResolver} from "../api/article/resolver/articles/articles-resolver.service";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {articles: ArticlesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
