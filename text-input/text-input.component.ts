import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pipe } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Output() changed = new EventEmitter<string>();
  @Input() form: FormControl;
  @Input() controlName: string;
  /**
   * Must by a boolean value
   */
  @Input() conditionalCheck: string;
  /**
   * Must by a boolean value
   */
  @Input() conditionalNoCheck: string;
  @Input() initialDisabled = false;
  @Input() placeholder = 'Ingrese los datos acá';

  ngOnInit(): void {
    if (this.conditionalCheck !== null || this.conditionalCheck !== undefined) {
      this.configConditionalCheck();
    } else if (
      this.conditionalNoCheck !== null ||
      this.conditionalNoCheck !== undefined
    ) {
      this.configConditionalNoCheck();
    }
  }

  configConditionalCheck() {
    this.form
      .get(this.conditionalCheck)
      .valueChanges.pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        if (value) {
          this.form.get(this.controlName).enable();
        } else {
          this.form.get(this.controlName).disable();
        }
        this.form.get(this.controlName).updateValueAndValidity();
      });
  }

  configConditionalNoCheck() {
    this.form
      .get(this.conditionalNoCheck)
      .valueChanges.pipe(startWith([this.initialDisabled]))
      .subscribe((value) => {
        if (value) {
          this.form.get(this.controlName).disable();
        } else {
          this.form.get(this.controlName).enable();
        }
        this.form.get(this.controlName).updateValueAndValidity();
      });
  }

  onValueChange() {
    this.changed.emit(this.form.get(this.controlName).value);
  }
}
