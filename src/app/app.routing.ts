import {HomeComponent} from "./content/home/home.component";
import {ContactComponent} from "./content/contact/contact.component";
import {ArticlePatternComponent} from "./content/articles/article-pattern/article-pattern.component";


export const AppRoutes: any = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'contact', component: ContactComponent,
  },
  {
    path: 'article/:title', component: ArticlePatternComponent,
  },
];

export const AppComponents: any = [];
