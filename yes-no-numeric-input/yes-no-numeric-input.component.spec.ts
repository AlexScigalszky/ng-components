import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoNumericInputComponent } from './yes-no-numeric-input.component';

describe('YesNoNumericInputComponent', () => {
  let component: YesNoNumericInputComponent;
  let fixture: ComponentFixture<YesNoNumericInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoNumericInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoNumericInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
