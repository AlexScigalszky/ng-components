import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-yes-no-input",
  templateUrl: "./yes-no-input.component.html",
  styleUrls: ["./yes-no-input.component.css"],
})
export class YesNoInputComponent implements OnInit {
  @Output() onChange = new EventEmitter<boolean | null>();
  @Input() form: FormControl;
  @Input() controlName: string;

  constructor() {}

  ngOnInit(): void {}

  onValueChange() {
    this.onChange.emit(this.form.get(this.controlName).value);
  }
}
