import { TestBed } from '@angular/core/testing';

import { ContentManagementGuard } from './content-management-guard.service';

describe('ContentManagmentGuard', () => {
  let guard: ContentManagementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContentManagementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
