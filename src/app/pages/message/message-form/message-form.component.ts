import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Message} from '../../../models/message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  public messageForm: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.messageForm = new FormGroup({
        'name' : new FormControl(''),
        'description' : new FormControl('')
    })
  }

  ngOnInit() {

  }

  onSubmit() {

  }

}
