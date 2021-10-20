import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePatternComponent } from './article-pattern/article-pattern.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './article-pattern/gallery/gallery.component';
import { SwiperModule } from 'swiper/angular';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticlePatternComponent, GalleryComponent],
  imports: [CommonModule, SharedModule, SwiperModule, ArticleRoutingModule],
})
export class ArticleModule {}
