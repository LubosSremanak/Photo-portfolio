import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Article} from "../../api/article/model/article";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {fadeInDownOnEnterAnimation} from "angular-animations";
import {ArticlesService} from "../../api/article/articles.service";

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
  animations: [fadeInDownOnEnterAnimation({anchor: 'enter'})]
})
export class ContentManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'about', 'nextArticleTitle1', 'nextArticleTitle2', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Article[]>;
  draggingDone: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articlesService: ArticlesService) {
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
    console.log(copy)
    this.articlesService.reorderArticles(this.dataSource.data as unknown as Article[]).subscribe();
  }

  openArticle(title: string): void {
    this.router.navigate(['/article', title])
  }
}
