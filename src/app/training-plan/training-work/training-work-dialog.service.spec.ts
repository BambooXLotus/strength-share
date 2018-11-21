import { TestBed } from '@angular/core/testing';

import { TrainingWorkDialogService } from './training-work-dialog.service';

describe('TrainingWorkDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingWorkDialogService = TestBed.get(TrainingWorkDialogService);
    expect(service).toBeTruthy();
  });
});
