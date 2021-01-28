import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-yes-no-input',
  templateUrl: './yes-no-input.component.html',
  styleUrls: ['./yes-no-input.component.css'],
})
export class YesNoInputComponent {
  @Output() changed = new EventEmitter<boolean | null>();
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() placeholder = 'Select';
  @Input() appendTo: string = null;
  @Input() nullable = false;

  onValueChange() {
    this.changed.emit(this.form.get(this.controlName).value);
  }
}
