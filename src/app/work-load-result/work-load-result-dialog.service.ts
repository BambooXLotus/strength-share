import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TrainingWorkLoad } from '../training-plan/training-work-load/training-work-load.model';
import { TrainingWork } from '../training-plan/training-work/training-work.model';
import { FirebaseService } from './../firebase.service';
import { WorkLoadResultComponent } from './work-load-result.component';

@Injectable({
  providedIn: 'root'
})
export class WorkLoadResultDialogService {
  constructor(private dialog: MatDialog, private firebaseService: FirebaseService, private snackBar: MatSnackBar) {}

  Open(selectedTrainingWork: TrainingWork, load: TrainingWorkLoad) {
    // ONLY TEMP UNTIL FIXING REQUIRED
    if (!load.resultNote) {
      load.resultNote = '';
    }

    if (!load.load) {
      load.load = 0;
      load.resultLoad = 0;
    }

    if (!load.loadDisplay) {
      load.loadDisplay = '';
    }

    if (!load.resultRpe) {
      load.resultRpe = selectedTrainingWork.rpe;
    }

    if (!load.resultLoad) {
      load.resultLoad = load.load;
    }

    const dialogRef = this.dialog.open(WorkLoadResultComponent, {
      width: '500px',
      data: load,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkLoad) => {
      if (result) {
        this.firebaseService.setTrainingWorkResult(selectedTrainingWork.id, result).subscribe(() => {
          this.snackBar.open('Result Saved', '', { duration: 3000 });
        });
      }
    });
  }
}
