import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
})
/**
 * At this moment, this component it's equal to text-input. Therefor, it must be improved by phone checking (cel-phone, home, work, etc)
 */
export class PhoneInputComponent implements OnInit {
  @Output() changed = new EventEmitter<string>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
    this.ngOnInit();
  }
  @Input() controlName: string;
  @Input() prefix: number | string;
  /**
   * Must be a boolean value
   */
  @Input() conditionalCheck: string;
  /**
   * Must be a boolean value
   */
  @Input() conditionalNoCheck: string;
  @Input() initialDisabled = false;
  @Input() placeholder = 'Ingrese los datos acá';
  formGroup: FormGroup;

  ngOnInit(): void {
    if (this.conditionalCheck !== null && this.conditionalCheck !== undefined) {
      this.configConditionalCheck();
    } else if (
      this.conditionalNoCheck !== null &&
      this.conditionalNoCheck !== undefined
    ) {
      this.configConditionalNoCheck();
    }
  }

  configConditionalCheck() {
    this.formGroup
      .get(this.conditionalCheck)
      ?.valueChanges.pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        if (value) {
          this.formGroup.get(this.controlName).enable();
        } else {
          this.formGroup.get(this.controlName).setValue(null);
          this.formGroup.get(this.controlName).disable();
        }
        this.formGroup.get(this.controlName).updateValueAndValidity();
      });
  }

  configConditionalNoCheck() {
    this.formGroup
      .get(this.conditionalNoCheck)
      ?.valueChanges.pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        if (value) {
          this.formGroup.get(this.controlName).setValue(null);
          this.formGroup.get(this.controlName).disable();
        } else {
          this.formGroup.get(this.controlName).enable();
        }
        this.formGroup.get(this.controlName).updateValueAndValidity();
      });
  }

  onValueChange() {
    this.changed.emit(this.formGroup.get(this.controlName).value);
  }
}
