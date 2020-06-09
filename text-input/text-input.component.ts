import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
})
export class TextInputComponent implements OnInit {
  @Output() onChange = new EventEmitter<string>();
  @Input() form: FormControl;
  @Input() controlName: string;

  constructor() {}

  ngOnInit(): void {}

  onTextChange() {
    this.onChange.emit(this.form.get(this.controlName).value);
  }
}
