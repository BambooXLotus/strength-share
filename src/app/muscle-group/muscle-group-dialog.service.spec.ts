import { TestBed } from '@angular/core/testing';

import { MuscleGroupDialogService } from './muscle-group-dialog.service';

describe('MuscleGroupDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuscleGroupDialogService = TestBed.get(MuscleGroupDialogService);
    expect(service).toBeTruthy();
  });
});
