import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-slider',
  templateUrl: './month-slider.component.html',
  styleUrls: ['./month-slider.component.scss'],
})
export class MonthSliderComponent implements OnInit {
  @Output() selectedMonth = new EventEmitter<number>();

  monthName: string;
  monthsToMove = 1;
  actualMonth: Date;

  ngOnInit() {
    this.actualMonth = new Date();
    this.monthName = this.getMonthName(this.actualMonth);
    this.monthClicked(this.actualMonth.getMonth());
  }

  getMonthName(from: string | Date): string {
    return new Date(from).toLocaleString('es-ve', { month: 'long' });
  }

  /**
   * @param {boolean} side true move to left, false move to right
   */
  moveToMonth(side: boolean, from: string | Date): void {
    let date = new Date(from);

    if (side) {
      this.actualMonth = new Date(
        date.getFullYear(),
        date.getMonth() - this.monthsToMove,
        date.getDate(),
      );
      this.monthName = this.getMonthName(this.actualMonth);
    } else {
      this.actualMonth = new Date(
        date.getFullYear(),
        date.getMonth() + this.monthsToMove,
        date.getDate(),
      );
      this.monthName = this.getMonthName(this.actualMonth);
    }
    this.monthClicked(this.actualMonth.getMonth());
  }

  monthClicked(month: number): void {
    this.selectedMonth.emit(month);
  }
}
