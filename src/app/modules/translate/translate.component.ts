import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "../shared/translate/translate.service";
import {Router} from "@angular/router";

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
    this.get();
  }

  get() {
    this.translateService.get()
      .subscribe(data=>{
        if (data.status && data.count) {
          this.listOfTranslate = data.body;
        }
      });
  }

  remove(id){
    this.translateService.remove(id).subscribe((data)=>{
      if (data.status) {
        this.message = data.message;
        this.get();
      }
    })
  }
}
