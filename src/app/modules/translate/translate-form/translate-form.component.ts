import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from '../../shared/translate/translate.service';
import {Translate} from "../../../models/translate";
import {Router, ActivatedRoute} from "@angular/router";
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
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
      this.createFrom(null)
  }


  createFrom(data) {
      this.translateForm = this.fb.group({
          'key': new FormControl(data ? data.key : '',  Validators.required),
          'value': new FormControl(data ? data.value : '',  Validators.required),
          'id': new FormControl(data ? data._id : ''),
      })
  }

    ngOnInit() {
        this.edit();
    }

    edit() {
        let id = this.route.snapshot.params.id;

        if (id) {
            this.translateService.getById(id)
                .subscribe(data=>{
                   if (data.count) {
                       this.createFrom(data.body[0]);
                   }
                });
        }

    }

    onSubmit(value, valid) {
        if (valid) {
            let translate = new Translate(value.key, value.value);

            translate.id = value.id;

            this.translateService
                .save(translate)
                .subscribe((data)=>{
                    if (data.status) {
                        this.translateService.sendMessage(data.message);
                        this.router.navigate(['/translate']);
                        this.translateService.updatePage();
                    }
                })
        }
    }

}
