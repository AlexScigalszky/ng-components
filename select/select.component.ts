import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { Option } from 'src/app/data/schema/option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements OnInit {
  @Input() id?: string;
  @Input() name: string;
  @Input() title: string;
  @Input() options$?: Observable<Option[]>;
  @Input() options?: Option[];
  @Input() required = false;
  @Output() changed: EventEmitter<Option> = new EventEmitter<Option>();
  @Input() placeholder = 'Selecciona una opción';
  @Input() set form(form: FormGroup) {
    this._form = form;
    this.updateSelectValue();
  }
  _form: FormGroup = null;
  selectValue: Option;
  filteredOptions: Option[] = [];
  inputFocus = false;
  mouseIn = false;

  constructor() {}

  ngOnInit() {
    this.options$.subscribe((opts: Option[]) => {
      this.options = opts ?? [];
      this.filterOptions('');
      this.updateSelectValue();
    });
  }

  updateSelectValue() {
    if (this.form?.get(this.name).value) {
      this.selectValue = this.options.find(
        (x) => x.id == this.form.get(this.name).value,
      );
    }
  }

  propagateChange = (_: any) => {};

  onChange(value: any) {
    this.selectValue = value;
    this.changed.emit(value);
    this.propagateChange(value.id);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selectValue = obj;
      this.changed.emit(obj);
    } else {
      this.selectValue = { name: '' };
      this.changed.emit({ name: '' });
      this.filterOptions('');
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  filterOptions(query: string) {
    if (query) {
      this.filteredOptions = this.options.filter((opt: Option) => {
        return opt.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    } else {
      this.filteredOptions = this.options;
    }
    this.filteredOptions?.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  optionClicked(id: number) {
    this.onChange(id);
    this.inputFocus = false;
    this.mouseIn = false;
  }

  onBlur(input: any) {
    this.inputFocus = false;
    if (!this.mouseIn && this.selectValue) {
      const matchingOption = this.options.find(
        (opt) => opt.name.toLowerCase() == input.value.toLowerCase(),
      );
      if (matchingOption) {
        this.onChange(matchingOption);
        this.filterOptions(matchingOption.name);
      } else {
        input.value = this.selectValue.name;
        this.filterOptions('');
      }
    }
  }

  cleanUnnecessaryWhiteSpaces(cadena: string) {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }
}
