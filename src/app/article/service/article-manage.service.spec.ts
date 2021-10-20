import { TestBed } from '@angular/core/testing';

import { ArticleManageService } from './article-manage.service';

describe('PhotosService', () => {
  let service: ArticleManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
