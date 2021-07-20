import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.css']
})
export class ArticleHeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() text: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
