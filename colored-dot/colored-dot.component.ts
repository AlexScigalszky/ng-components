import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-colored-dot",
  templateUrl: "./colored-dot.component.html",
  styleUrls: ["./colored-dot.component.css"],
})
export class ColoredDotComponent implements OnInit {
  @Input() orange: boolean = false;
  @Input() red: boolean = false;
  @Input() yellow: boolean = false;
  @Input() green: boolean = false;
  @Input() grey: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
