import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ColoredDotComponent } from "./colored-dot.component";

describe("ColoredDotComponent", () => {
  let component: ColoredDotComponent;
  let fixture: ComponentFixture<ColoredDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColoredDotComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
