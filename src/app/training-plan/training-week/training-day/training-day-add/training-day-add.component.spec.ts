import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayAddComponent } from './training-day-add.component';

describe('TrainingDayAddComponent', () => {
  let component: TrainingDayAddComponent;
  let fixture: ComponentFixture<TrainingDayAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDayAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
