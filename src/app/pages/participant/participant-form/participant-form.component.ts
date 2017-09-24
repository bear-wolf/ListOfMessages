import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PartisipantServiceService} from '../partisipant-service.service';
import {Participant} from '../../../models/participant';


@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.css']
})
export class ParticipantFormComponent implements OnInit {
  public participantForm: FormGroup;

  constructor(
      private participantService: PartisipantServiceService
  ) {

    this.participantForm = new FormGroup({
      'firstName': new FormControl('',  Validators.required),
      'lastName': new FormControl('',  Validators.required),
      'middleName': new FormControl('',  Validators.required)
    })
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
    if (form.valid) {
      let user,
          value = form.value;

      user = new Participant(value.firstName, value.lastName, value.middleName);

      this.participantService.save(user)
    }
  }
}
