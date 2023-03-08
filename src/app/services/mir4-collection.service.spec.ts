import { TestBed } from '@angular/core/testing';

import { Mir4CollectionService } from './mir4-collection.service';

describe('Mir4CollectionService', () => {
  let service: Mir4CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mir4CollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
