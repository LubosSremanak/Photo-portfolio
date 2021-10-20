import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePatternComponent } from './article-pattern.component';

describe('ArticlePatternComponent', () => {
  let component: ArticlePatternComponent;
  let fixture: ComponentFixture<ArticlePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlePatternComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
