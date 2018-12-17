import { NyeEvent } from './nye-event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nye',
  templateUrl: './nye.component.html',
  styleUrls: ['./nye.component.css']
})
export class NyeComponent implements OnInit {
  nyeEvents: Array<NyeEvent>;
  displayedColumns: string[] = ['name', 'price', 'food', 'bar', 'location'];

  constructor() {}

  ngOnInit() {
    this.nyeEvents = new Array<NyeEvent>(
      new NyeEvent(
        'Howl at the Moon Kansas City (7PM-1AM)',
        135,
        true,
        true,
        'https://www.google.com/maps?ll=39.098195,-94.5813&z=16&t=m&hl=en-US&gl=US&mapclient=embed&daddr=Howl+at+the+Moon+Kansas+City+1334+Grand+Blvd+Kansas+City,+MO+64106@39.0981947,-94.5812997',
        'https://www.howlatthemoon.com/nye-kc/'
      ),
      new NyeEvent(
        'Fantasy NYE 2019 (9PM-1:30AM)',
        89,
        true,
        true,
        'https://www.google.com/maps/place/4124+Pennsylvania+Ave,+Kansas+City,+MO+64111/data=!4m2!3m1!1s0x87c0efc5066d088f:0x61cd1ee679cd6cee?ved=2ahUKEwj61b_Mh6ffAhWuneAKHfDyARcQ8gEwAHoECAIQAQ',
        'https://kansascity-newyearseve.com/'
      ),
      new NyeEvent(
        'NYE Live! Kansas City (GOLD) - Food After Midnight - (9PM-1AM)',
        85,
        true,
        true,
        'https://www.google.com/maps/place/4124+Pennsylvania+Ave,+Kansas+City,+MO+64111/data=!4m2!3m1!1s0x87c0efc5066d088f:0x61cd1ee679cd6cee?ved=2ahUKEwj61b_Mh6ffAhWuneAKHfDyARcQ8gEwAHoECAIQAQ',
        'https://kansascity-newyearseve.com/'
      )
    );
  }
}
