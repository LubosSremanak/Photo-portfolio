import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ArticlesResolver } from './resolver/articles.resolver';

export const routes: any = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      articles: ArticlesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
