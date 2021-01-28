import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-yes-no-numeric-input',
  templateUrl: './yes-no-numeric-input.component.html',
  styleUrls: ['./yes-no-numeric-input.component.css'],
})
export class YesNoNumericInputComponent implements OnInit {
  @Output() previousStep = new EventEmitter<boolean>();
  @Output() selectedDay = new EventEmitter<Date>();
  @Output() changed = new EventEmitter<boolean | null>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
    this.ngOnInit();
  }
  @Input() controlName: string;
  @Input() placeholder = 'Select';
  @Input() appendTo: string = null;
  @Input() nullable = false;
  /**
   * Must be a boolean value
   */
  @Input() conditionalNoCheck: string = null;
  @Input() initialDisabled = false;
  formGroup: FormGroup;

  ngOnInit(): void {
    if (this.conditionalNoCheck !== null) {
      this.formGroup
        .get(this.conditionalNoCheck)
        ?.valueChanges.pipe(startWith([this.initialDisabled]))
        .subscribe((value) => {
          const control = this.formGroup.get(this.controlName);
          if (value) {
            control.reset();
            control.disable();
          } else {
            control.enable();
          }
          control.updateValueAndValidity();
        });
    }
  }

  onValueChange() {
    this.changed.emit(this.form.get(this.controlName).value);
  }
}
