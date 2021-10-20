import { Component } from '@angular/core';
import { AdminStatusService } from './core/admin-status/service/admin-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private adminStatusService: AdminStatusService) {}

  title = 'Natalia Tomkova';

  public isAdminOpen(): boolean {
    return this.adminStatusService.isOpen;
  }
}
