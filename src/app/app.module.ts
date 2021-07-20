import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './content/home/home.component';
import {ContactComponent} from './content/contact/contact.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {LottieComponent} from "./shared/lottie-animations/lottie/lottie.component";
import {LottieModule} from "ngx-lottie";
import {playerFactory} from "./shared/lottie-animations/model/playerFactory";
import {ArticleHeaderComponent} from './content/article-header/article-header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ArticleFooterComponent} from './content/article-footer/article-footer.component';
import {ImageTileComponent} from './content/image-tile/image-tile.component';
import {ArticlePatternComponent} from './content/articles/article-pattern/article-pattern.component';
import {GalleryComponent} from './content/gallery/gallery.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    LottieComponent,
    ArticleHeaderComponent,
    ArticleFooterComponent,
    ImageTileComponent,
    ArticlePatternComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    LottieModule.forRoot({
      player: playerFactory,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
