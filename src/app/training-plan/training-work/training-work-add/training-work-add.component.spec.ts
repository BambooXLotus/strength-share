import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWorkAddComponent } from './training-work-add.component';

describe('TrainingWorkAddComponent', () => {
  let component: TrainingWorkAddComponent;
  let fixture: ComponentFixture<TrainingWorkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingWorkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingWorkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
