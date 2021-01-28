import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchInputComponent,
      multi: true,
  }],
})
export class SwitchInputComponent implements ControlValueAccessor {
  @Input() label: string;
  formValue: boolean = false;

  onChange: (_: any) => void;

  constructor() { }

  changed(value: boolean) {
    this.onChange(value);
    this.formValue = value;
  }

  writeValue(value: boolean): void {
    this.formValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}

