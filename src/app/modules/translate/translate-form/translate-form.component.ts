import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from '../../shared/translate/translate.service';

@Component({
  selector: 'app-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.css']
})
export class TranslateFormComponent implements OnInit {
  translateForm: FormGroup;

  constructor(
      private translateService: TranslateService,
      private fb: FormBuilder
  ) {
      this.translateForm = this.fb.group({
          'key': new FormControl('',  Validators.required),
          'value': new FormControl('',  Validators.required),
      })
  }

  ngOnInit() {
  }

    onSubmit(form) {
        // console.log(form);
        // if (form.valid) {
        //     let user,
        //         value = form.value;
        //
        //     user = new User(value.firstName, value.lastName, value.middleName);
        //
        //     this.translateService.save(user)
        // }
    }
}
