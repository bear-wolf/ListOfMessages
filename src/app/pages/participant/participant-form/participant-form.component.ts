import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParticipantService} from '../participant.service';
import {Participant} from '../../../models/participant';
import {Router} from "@angular/router";


@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.css']
})
export class ParticipantFormComponent implements OnInit {
  participantForm: FormGroup;

  constructor(
      private participantService: ParticipantService,
      private router: Router,
      private fb: FormBuilder
  ) {

    this.participantForm = this.fb.group({
      'firstName': [''],
      'lastName': [''],
      'middleName': ['']
    })
  }

  ngOnInit() {
  }

  onSubmit(value, valid) {
    if (valid) {
      let user = new Participant(value.firstName, value.lastName, value.middleName);

      this.participantService.save(user).subscribe(()=>{
        this.router.navigate(['/participant']);
      })
    }
  }
}
