import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Article} from '../../api/article/model/article';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation,} from 'angular-animations';
import {ArticlesService} from '../../api/article/articles.service';
import {DialogService} from '../../shared/dialog/service/dialog.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
  animations: [
    fadeInDownOnEnterAnimation({anchor: 'enter'}),
    fadeOutUpOnLeaveAnimation({anchor: 'leave'}),
  ],
})
export class ContentManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'title',
    'about',
    'nextArticleTitle1',
    'nextArticleTitle2',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<Article[]>;
  draggingDone: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    private dialogService: DialogService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.route.data.subscribe(this.handleArticles);
    this.draggingDone = true;
  }

  ngAfterViewInit() {
  }

  private handleArticles = (data: any): void => {
    this.dataSource = new MatTableDataSource(data.articles);
  };


  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    const copy = [...this.dataSource.data];
    moveItemInArray(copy, event.previousIndex, event.currentIndex);
    this.dataSource.data = copy;
    this.draggingDone = true;
    this.articlesService
      .reorderArticles(this.dataSource.data as unknown as Article[])
      .subscribe();
  }

  openArticle(title: string): void {
    this.router.navigate(['/article', title]).then();
  }

  edit(event: MouseEvent, title: string) {
    event.stopPropagation();
    this.router.navigate(['/admin/articleEdit', title]).then();
  }

  delete(event: MouseEvent, title: string) {
    event.stopPropagation();
    this.dialogService.openDialog({
      actionDanger: 'Cancel',
      actionSuccess: 'Delete',
      question: 'Are you sure ?',
      resultHandler: (result) => {
        this.handleArticleDelete(result, title);
      },
    });
  }

  deleteFromDataSource(title: string): void {
    const data = this.dataSource.data;
    const index = data.findIndex((article: any) => {
      return article.title === title;
    });
    if (index !== -1) data.splice(index, 1);
    this.dataSource.data =data;
  }

  handleArticleDelete(result: boolean | undefined, title: string): void {
    if (result) {
      this.deleteFromDataSource(title);
      this.articlesService.deleteArticle(title).subscribe();
    }
  }

  addArticle(): void {
    this.router.navigate(['/admin/articleAdd']).then();
  }
}
