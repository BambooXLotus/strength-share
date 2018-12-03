import { TestBed } from '@angular/core/testing';

import { TrainingWeekDialogService } from './training-week-dialog.service';

describe('TrainingWeekDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingWeekDialogService = TestBed.get(TrainingWeekDialogService);
    expect(service).toBeTruthy();
  });
});
