import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWorksSortComponent } from './training-works-sort.component';

describe('TrainingWorksSortComponent', () => {
  let component: TrainingWorksSortComponent;
  let fixture: ComponentFixture<TrainingWorksSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingWorksSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingWorksSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
