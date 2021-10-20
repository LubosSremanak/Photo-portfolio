import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LottieModule } from './lottie-ls/lottie.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageTileComponent } from './image-tile/image-tile.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { ArticleFooterComponent } from './article-footer/article-footer.component';

@NgModule({
  declarations: [
    ImageTileComponent,
    ArticleHeaderComponent,
    ArticleFooterComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    MatIconModule,
    LottieModule,
    FontAwesomeModule,
    ImageTileComponent,
    ArticleHeaderComponent,
    ArticleFooterComponent,
  ],
})
export class SharedModule {}
