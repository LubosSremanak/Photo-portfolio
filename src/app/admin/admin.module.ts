import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {LoginComponent} from './login/login.component';

import {ArticleAddComponent} from './content-management/article-add/article-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContentManagementComponent} from "./content-management/content-management.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    ContentManagementComponent,
    ArticleAddComponent,
  ],
    imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AdminModule {
}
