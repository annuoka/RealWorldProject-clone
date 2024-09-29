import {TestBed} from '@angular/core/testing';
import {CreateArticleService} from '../../create-article/services/create-article.service';

import {UpdateArticleService} from './update-article.service';

describe('UpdateArticleService', () => {
  let service: UpdateArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
