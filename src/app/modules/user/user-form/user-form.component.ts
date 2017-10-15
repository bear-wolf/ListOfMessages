import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user-service.service';
import {User} from '../user-model';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  participantForm: FormGroup;

  constructor(
      private userService: UserService,
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

      user = new User(value.firstName, value.lastName, value.middleName);

      this.userService.save(user)
    }
  }
}
