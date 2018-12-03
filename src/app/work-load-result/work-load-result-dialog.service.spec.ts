import { TestBed } from '@angular/core/testing';

import { WorkLoadResultDialogService } from './work-load-result-dialog.service';

describe('WorkLoadResultDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkLoadResultDialogService = TestBed.get(WorkLoadResultDialogService);
    expect(service).toBeTruthy();
  });
});
