import { Component, OnInit } from '@angular/core';
import { ParticipantService } from "./participant.service";
import {Participant} from "../../models/participant";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  participants: Participant[];

  constructor(private participantService : ParticipantService) { }

  ngOnInit() {
    this.participantService.getAll().subscribe((data)=>{
      this.participants = data;
    });
  }

}
