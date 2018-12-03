import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWorkLoadComponent } from './training-work-load.component';

describe('TrainingWorkLoadComponent', () => {
  let component: TrainingWorkLoadComponent;
  let fixture: ComponentFixture<TrainingWorkLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingWorkLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingWorkLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
