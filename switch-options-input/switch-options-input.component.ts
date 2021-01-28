import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from 'src/app/data/schema/option';

@Component({
  selector: 'app-switch-options-input',
  templateUrl: './switch-options-input.component.html',
  styleUrls: ['./switch-options-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: SwitchOptionsInputComponent, 
    multi: true
  }]
})
export class SwitchOptionsInputComponent implements ControlValueAccessor {
  @Input() title: string
  @Input() controlName: string;
  @Input() options: Option[];
  formValue: Option;
  position: number = 2;

  public get percentage(): number {
    return 100 / (this.options?.length ?? 1);
  }

  onChange: (_: any) => void;

  constructor() {
    this.options = [
      { id: 0, name: 'Todos' },
      { id: 1, name: 'Vigente' },
      { id: 2, name: 'No vigente' },
    ];
    this.position =  this.options.length - 1;
   }

  changed(value: Option, position: number) {
    this.onChange(value);
    this.position = position;
    this.onChange(value);
  }

  writeValue(obj: Option): void {
    this.formValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {}

}
