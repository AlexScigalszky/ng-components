import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
})
export class SwitchInputComponent {
  @Output() changed = new EventEmitter<any>();
  @Input() form: FormControl;
  @Input() controlName: string;
  @Input() placeholder = '';
  @Input() label  = 'Switch';

  onValueChange() {
    const control = this.form.get(this.controlName);
    const value = control.value;
    this.changed.emit(value);
  }
}
