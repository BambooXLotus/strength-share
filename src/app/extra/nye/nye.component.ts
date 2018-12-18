import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../firebase.service';
import { NyeEvent } from './nye-event.model';
import { shareReplay, share } from 'rxjs/operators';

@Component({
  selector: 'app-nye',
  templateUrl: './nye.component.html',
  styleUrls: ['./nye.component.css']
})
export class NyeComponent implements OnInit {
  nyeEvents: Array<NyeEvent>;
  displayedColumns: string[] = ['name', 'price', 'food', 'bar', 'location', 'info', 'vote'];

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.nyeEvents = new Array<NyeEvent>(
      new NyeEvent(
        '1',
        'House Party @ ABNB',
        0,
        false,
        false,
        'https://www.google.com/maps/place/Midtown+-+Westport,+Kansas+City,+MO/@39.0595993,-94.6195525,13z/data=!3m1!4b1!4m5!3m4!1s0x87c0efde747e10eb:0x78ffb5729b715a32!8m2!3d39.0587452!4d-94.5985613',
        'google.com',
        this.fb.getVotes('1')
      ),
      new NyeEvent(
        '2',
        'Howl at the Moon Kansas City (7PM-1AM)',
        135,
        true,
        true,
        'https://www.google.com/maps?ll=39.098195,-94.5813&z=16&t=m&hl=en-US&gl=US&mapclient=embed&daddr=Howl+at+the+Moon+Kansas+City+1334+Grand+Blvd+Kansas+City,+MO+64106@39.0981947,-94.5812997',
        'https://www.howlatthemoon.com/nye-kc/',
        this.fb.getVotes('2')
      ),
      new NyeEvent(
        '3',
        'Fantasy NYE 2019 (9PM-1:30AM)',
        89,
        true,
        true,
        'https://www.google.com/maps/place/4124+Pennsylvania+Ave,+Kansas+City,+MO+64111/data=!4m2!3m1!1s0x87c0efc5066d088f:0x61cd1ee679cd6cee?ved=2ahUKEwj61b_Mh6ffAhWuneAKHfDyARcQ8gEwAHoECAIQAQ',
        'https://kansascity-newyearseve.com/',
        this.fb.getVotes('3')
      ),
      new NyeEvent(
        '4',
        'NYE Live! Kansas City (GOLD) - Food After Midnight - (9PM-1AM)',
        85,
        true,
        true,
        'https://www.google.com/maps/place/4124+Pennsylvania+Ave,+Kansas+City,+MO+64111/data=!4m2!3m1!1s0x87c0efc5066d088f:0x61cd1ee679cd6cee?ved=2ahUKEwj61b_Mh6ffAhWuneAKHfDyARcQ8gEwAHoECAIQAQ',
        'https://www.nye-live.com/kansas-city',
        this.fb.getVotes('4')
      )
    );
  }

  vote(id: string) {
    this.fb.addVote(id).subscribe((s) => {});
  }
}
