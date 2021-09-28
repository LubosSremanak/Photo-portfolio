import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


export const routes: any = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(module => module.CoreModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(module => module.ContactModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(module => module.ArticleModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
