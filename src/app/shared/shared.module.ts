import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LottieModule } from './lottie-ls/lottie.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageTileComponent } from './image-tile/image-tile.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { ArticleFooterComponent } from './article-footer/article-footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';
import {NgxScrollTopModule} from "ngx-scrolltop";

@NgModule({
  declarations: [
    ImageTileComponent,
    ArticleHeaderComponent,
    ArticleFooterComponent,
    DialogComponent,
  ],
    imports: [CommonModule, MatIconModule, MatDialogModule, NgxScrollTopModule],
  exports: [
    MatIconModule,
    LottieModule,
    FontAwesomeModule,
    ImageTileComponent,
    ArticleHeaderComponent,
    ArticleFooterComponent,
  ],
  providers: [NgxImageCompressService],
})
export class SharedModule {}
