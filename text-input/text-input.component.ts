import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Output() changed = new EventEmitter<string>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
    this.ngOnInit();
  }
  @Input() controlName: string;
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
    this.formGroup.controls[this.conditionalCheck]?.valueChanges
      .pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        const control = this.formGroup.get(this.controlName);
        if (value) {
          control.enable();
        } else {
          control.setValue(null);
          control.disable();
        }
        control.updateValueAndValidity();
      });
  }

  configConditionalNoCheck() {
    this.formGroup
      .get(this.conditionalNoCheck)
      ?.valueChanges.pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        const control = this.formGroup.get(this.controlName);
        if (value) {
          control.setValue(null);
          control.disable();
        } else {
          control.enable();
        }
        control.updateValueAndValidity();
      });
  }

  onValueChange() {
    this.changed.emit(this.formGroup.get(this.controlName).value);
  }
}
