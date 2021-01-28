import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityFilterInputComponent } from './validity-filter-input.component';

describe('ValidityFilterInputComponent', () => {
  let component: ValidityFilterInputComponent;
  let fixture: ComponentFixture<ValidityFilterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidityFilterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidityFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
