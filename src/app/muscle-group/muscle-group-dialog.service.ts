import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { FirebaseService } from '../firebase.service';
import { MuscleGroupAddComponent } from './muscle-group-add/muscle-group-add.component';
import { MuscleGroup } from './muscle-group.model';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupDialogService {
  constructor(private dialog: MatDialog, private firebaseService: FirebaseService, private snackBar: MatSnackBar) {}

  openAdd(): void {
    const muscleGroup = new MuscleGroup('', 0, 0, 0, 0, 0);

    const dialogRef = this.dialog.open(MuscleGroupAddComponent, {
      width: '500px',
      data: muscleGroup,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: MuscleGroup) => {
      if (result) {
        this.firebaseService.addMuscleGroup(result).subscribe((s) => {
          this.snackBar.open('Muscle Group Added', '', { duration: 3000 });
        });
      }
    });
  }
}
