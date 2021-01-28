import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css'],
})
export class TextareaInputComponent implements OnInit {
  @Output() changed = new EventEmitter<boolean | null>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
    this.ngOnInit();
  }
  @Input() controlName: string;
  @Input() readonly: boolean;
  @Input() rows = 3;
  @Input() placeholder = '';
  formGroup: FormGroup;

  value: string;

  ngOnInit(): void {
    this.value = this.formGroup.get(this.controlName)?.value;
    this.formGroup.get(this.controlName)?.valueChanges.subscribe((value: string) => {
      this.value = value;
    });
  }

  onValueChange() {
    this.changed.emit(this.formGroup.get(this.controlName).value);
  }
}
