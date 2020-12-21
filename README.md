# ng-components
My own Angular components


## date-input
```
<input type="checkbox" class="custom-control-input" id="customCheck2" formControlName="{{ Field.NO_BIRTHDATE }}"> Ask for bithdate

Birthdate
<app-date-input [form]="form" [controlName]="Field.BIRTHDATE" [conditionalCheck]="Field.NO_BIRTHDATE" [initialDisabled]="false" [maxDate]="eigthteenYearsAgo"></app-date-input>
```