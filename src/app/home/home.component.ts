import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  RepMaxes: RepMax[] = [
    new RepMax("Bench", 100),
    new RepMax("Squat", 100),
    new RepMax("Deadlift", 100)
  ];

  constructor() {}

  ngOnInit() {}
}

export class RepMax {
  constructor(private lift: string, private weight: number) {}
}
