import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from '../../shared/translate/translate.service';
import {Translate} from "../../../models/translate";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.css']
})
export class TranslateFormComponent implements OnInit {
  translateForm: FormGroup;


  constructor(
      private translateService: TranslateService,
      private route: Router,
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
            debugger;
            this.translateService
                .save(new Translate(value.key, value.value))
                .subscribe((data)=>{
                    if (data.status) {
                        data.message = 'The record was successfull created';
                        this.translateService.sendMessage(data);
                        this.route.navigate(['/translate']);
                    }
                })
        }
    }

}
