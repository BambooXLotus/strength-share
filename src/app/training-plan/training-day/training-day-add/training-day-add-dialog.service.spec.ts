import { TestBed } from '@angular/core/testing';

import { TrainingDayAddDialogService } from './training-day-add-dialog.service';

describe('TrainingDayAddDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingDayAddDialogService = TestBed.get(TrainingDayAddDialogService);
    expect(service).toBeTruthy();
  });
});
