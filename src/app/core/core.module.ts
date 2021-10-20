import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStatusComponent } from './admin-status/admin-status.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AdminStatusComponent, NavbarComponent],
  exports: [AdminStatusComponent, NavbarComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class CoreModule {}
