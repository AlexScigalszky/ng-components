import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements OnInit {
  @Output() changed = new EventEmitter<any>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
    this.ngOnInit();
  }
  @Input() controlName: string;
  /**
   * Must be a boolean value
   */
  @Input() conditionalCheck: string = null;
  @Input() initialDisabled = false;
  @Input() placeholder = '';
  @Input() maxDate: Date = null;
  formGroup: FormGroup;

  ngOnInit(): void {
    if (this.conditionalCheck !== null) {
      this.formGroup
        .get(this.conditionalCheck)
        .valueChanges.pipe(startWith(!this.initialDisabled))
        .subscribe((value) => {
          const control = this.formGroup.get(this.controlName);
          if (value) {
            control.enable();
          } else {
            control.reset();
            control.disable();
          }
          control.updateValueAndValidity();
        });
    }
  }

  onValueChange() {
    const control = this.formGroup.get(this.controlName);
    const value = control.value;
    if (this.maxDate !== null && new Date(value) > this.maxDate) {
      control.setValue(null);
    } else {
      this.changed.emit(value);
    }
  }
}
