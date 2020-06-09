import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.css"],
})
export class DateInputComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() form: FormControl;
  @Input() controlName: string;

  constructor() {}

  ngOnInit(): void {}

  onDateChange() {
    this.onChange.emit(this.form.get(this.controlName).value);
  }
}
