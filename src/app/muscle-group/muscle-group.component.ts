import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseService } from './../firebase.service';
import { MuscleGroupDialogService } from './muscle-group-dialog.service';
import { MuscleGroup } from './muscle-group.model';

@Component({
  selector: 'app-muscle-group',
  templateUrl: './muscle-group.component.html',
  styleUrls: ['./muscle-group.component.css']
})
export class MuscleGroupComponent implements OnInit {
  muscleGroups$: Observable<MuscleGroup[]> | null = null;

  constructor(private fbService: FirebaseService, private muscleGroupDialog: MuscleGroupDialogService) {}

  ngOnInit() {
    this.muscleGroups$ = this.fbService.getMuscleGroups();
  }

  openAddMuscleGroupDialog() {
    this.muscleGroupDialog.openAdd();
  }
}
