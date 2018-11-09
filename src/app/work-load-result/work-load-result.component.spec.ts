import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLoadResultComponent } from './work-load-result.component';

describe('WorkLoadResultComponent', () => {
  let component: WorkLoadResultComponent;
  let fixture: ComponentFixture<WorkLoadResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLoadResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLoadResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
