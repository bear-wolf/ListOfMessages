import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "../shared/translate/translate.service";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  message: null;
  listOfTranslate: null;

  constructor(
      private translateService: TranslateService
  ) { }

  ngOnInit() {
    console.log('TranslateComponent');
    this.translateService.getMessage().subscribe((data)=>{
      if (data.status) {
        this.message = data.message;
      }
    })

    this.translateService.get()
        .subscribe(data=>{
          if (data.status && data.count) {
            this.listOfTranslate = data.body;
          }
      });

  }
}
