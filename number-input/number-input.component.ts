import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-number-input",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.css"],
})
export class NumberInputComponent implements OnInit {
  @Output() onChange = new EventEmitter<number>();
  @Input() form: FormControl;
  @Input() controlName: string;

  constructor() {}

  ngOnInit(): void {}

  onNumberChange() {
    this.onChange.emit(this.form.get(this.controlName).value);
  }
}
