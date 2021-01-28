import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

interface dayOfWeek {
  name: string;
  number: number;
  active: boolean;
  date: string | Date;
}
@Component({
  selector: 'app-days-slider',
  templateUrl: './days-slider.component.html',
  styleUrls: ['./days-slider.component.scss'],
})
export class DaysSliderComponent implements OnInit {
  private _month: number;
  @Output() previousStep = new EventEmitter<boolean>();
  @Output() selectedDay = new EventEmitter<Date>();
  @Input() set month(value: number) {
    this._month = value;
    this.loadOnChangeMonth();
  }

  get month(): number {
    return this._month;
  }

  daysToMove = 7;
  daysRange: Array<dayOfWeek> = [];
  initialDate: Date;
  firstDayOfWeek: Date;

  constructor(private router: Router) {}

  ngOnInit() {}

  loadOnChangeMonth() {
    this.initialDate = this.initializeDate(this.month);
    this.firstDayOfWeek = new Date(this.getSundayFromDate(this.initialDate));
    this.daysRange = this.generateDays(
      this.getSundayFromDate(this.initialDate),
    );
    this.dayClicked(this.initialDate);
  }

  initializeDate(month: number): Date {
    const currentDate = new Date();
    const daysOfMonth = new Date(
      currentDate.getFullYear(),
      month + 1,
      0,
    ).getDate();
    let ret: Date;

    if (currentDate.getDate() > daysOfMonth) {
      ret = new Date(currentDate.getFullYear(), month + 1, 0);
    } else {
      ret = new Date(currentDate.getFullYear(), month, currentDate.getDate());
    }

    return ret;
  }

  generateDays(from: string | Date): Array<dayOfWeek> {
    const dayNames = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
      'Lunes',
      'Martes',
    ];
    const fromDate = new Date(from);
    let ret: Array<dayOfWeek> = [];

    dayNames.forEach((name, index) => {
      const date = new Date(fromDate);
      date.setDate(date.getDate() + index);
      ret.push({
        name: name,
        number: date.getDate(),
        active: false,
        date: date,
      });
    });
    return ret;
  }

  getSundayFromDate(from: string | Date): Date {
    const fromDate = new Date(from);
    let sunday = fromDate.getDate() - fromDate.getDay();
    return new Date(fromDate.setDate(sunday));
  }

  setActiveDate(daysRange: Array<dayOfWeek>, date: string | Date): void {
    const dayNumber = new Date(date).getDate();

    daysRange.forEach((day) => {
      day.active = day.number === dayNumber;
    });
  }

  /**
   * @param {boolean} side true move to left, false move to right
   */
  moveToDate(side: boolean, from: string | Date): void {
    let date = new Date(from);

    if (side) {
      this.firstDayOfWeek = new Date(
        date.setDate(date.getDate() - this.daysToMove),
      );
      this.daysRange = this.generateDays(this.firstDayOfWeek);
    } else {
      this.firstDayOfWeek = new Date(
        date.setDate(date.getDate() + this.daysToMove),
      );
      this.daysRange = this.generateDays(this.firstDayOfWeek);
    }
  }

  dayClicked(from: string | Date): void {
    const date = new Date(from);
    this.setActiveDate(this.daysRange, date);
    this.selectedDay.next(date);
  }

  previousStepClicked(): void {
    this.previousStep.emit(true);
  }
}
