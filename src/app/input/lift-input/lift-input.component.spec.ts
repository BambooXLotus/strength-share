import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftInputComponent } from './lift-input.component';

describe('LiftInputComponent', () => {
  let component: LiftInputComponent;
  let fixture: ComponentFixture<LiftInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
