import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupAddComponent } from './muscle-group-add.component';

describe('MuscleGroupAddComponent', () => {
  let component: MuscleGroupAddComponent;
  let fixture: ComponentFixture<MuscleGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuscleGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuscleGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
