import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWorkComponent } from './training-work.component';

describe('TrainingWorkComponent', () => {
  let component: TrainingWorkComponent;
  let fixture: ComponentFixture<TrainingWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
