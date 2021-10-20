import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AdminStatusService } from '../../core/admin-status/service/admin-status.service';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleHeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() text: string | undefined;

  constructor(private adminStatusService: AdminStatusService) {}

  ngOnInit(): void {}

  public isAdminOpen(): boolean {
    return this.adminStatusService.isOpen;
  }
}
