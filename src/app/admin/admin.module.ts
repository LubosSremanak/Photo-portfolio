import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {LoginComponent} from './login/login.component';

import {ArticleAddComponent} from './content-management/article-add/article-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContentManagementComponent} from "./content-management/content-management.component";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TextOverflowPipe} from "./content-management/pipe/text-overflow.pipe";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    LoginComponent,
    ContentManagementComponent,
    ArticleAddComponent,
    TextOverflowPipe
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, SharedModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DragDropModule],
})
export class AdminModule {
}
