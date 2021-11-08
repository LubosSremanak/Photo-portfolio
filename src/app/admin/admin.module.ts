import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ArticleAddComponent } from './content-management/article-add/article-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentManagementComponent } from './content-management/content-management.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TextOverflowPipe } from './content-management/pipe/text-overflow.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImageManagerComponent } from './content-management/article-add/image-manager/image-manager.component';
import { ImageUploaderComponent } from './content-management/article-add/image-manager/image-uploader/image-uploader.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MiniStepperComponent } from './content-management/article-add/image-manager/mini-stepper/mini-stepper.component';
import { FlexModule } from '@angular/flex-layout';
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UserSettingsComponent } from './content-management/user-settings/user-settings.component';
import { PasswordChangeComponent } from './content-management/user-settings/password-change/password-change.component';
import { FieldComponent } from './content-management/user-settings/password-change/field/field.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    LoginComponent,
    ContentManagementComponent,
    ArticleAddComponent,
    TextOverflowPipe,
    ImageManagerComponent,
    ImageUploaderComponent,
    MiniStepperComponent,
    UserSettingsComponent,
    PasswordChangeComponent,
    FieldComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        DragDropModule,
        ScrollingModule,
        FlexModule,
        MatTabsModule,
        MatProgressSpinnerModule,
      MatSnackBarModule
    ],
  providers: [NgxImageCompressService],
})
export class AdminModule {}
