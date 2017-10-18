import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from '../../shared/translate/translate.service';
import {Translate} from "../../../models/translate";

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

    onSubmit(value, valid) {
        if (valid) {
            this.translateService
                .save(new Translate(value.key, value.value))
                .subscribe((data)=>{
                    debugger;
                })
        }
    }
}
