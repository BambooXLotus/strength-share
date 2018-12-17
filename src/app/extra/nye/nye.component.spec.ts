import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyeComponent } from './nye.component';

describe('NyeComponent', () => {
  let component: NyeComponent;
  let fixture: ComponentFixture<NyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
