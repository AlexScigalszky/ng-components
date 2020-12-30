import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
})
export class TextareaComponent {
  @Input() cols: string;
  @Input() rows: string;
  @Input() forLabel: any;
  @Input() label: any;

  textValue: string;
  propagateChange = (_: any) => {};

  onChange(value: string) {
    this.textValue = value;
    this.propagateChange(this.textValue);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
