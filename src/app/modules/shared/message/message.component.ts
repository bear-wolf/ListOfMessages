import {Component, OnInit, OnDestroy} from '@angular/core';
import {TranslateService} from "../translate/translate.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: null;

  private subscription: Subscription;

  constructor(
      private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.subscription = this.translateService.getMessage().subscribe((message)=>{
      this.subscription.unsubscribe();
      this.message = message;
    })
  }

  close() {
    this.message = null;
  }

  ngOnDestroy(){

  }

}
