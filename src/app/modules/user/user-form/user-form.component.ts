import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PartisipantServiceService} from '../user-service.service';
import {Participant} from '../../../models/users';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  participantForm: FormGroup;

  constructor(
      private participantService: PartisipantServiceService,
      private fb: FormBuilder
  ) {

    this.participantForm = this.fb.group({
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
