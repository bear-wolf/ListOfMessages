import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "../shared/translate/translate.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  message: null;
  listOfTranslate: null;

  constructor(
      private translateService: TranslateService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('TranslateComponent');
    this.translateService.getMessage().subscribe((data)=>{
      if (data.status) {
        this.message = data.message;
      }
    })
    this.get();

    this.translateService.dataIsChanged().subscribe((data)=>{
        if (data.status) {
            this.get();
        }
    })
  }

  get() {
    this.translateService.get()
      .subscribe(data=>{
        if (data.status && data.count) {
          this.listOfTranslate = data.body;
        } else{
          this.translateService.sendMessage(data.message);
        }
      });
  }

  remove(id){
    this.translateService.remove(id).subscribe((data)=>{
      if (data.status) {
        this.message = data.message;
        this.get();
      } else {
          this.translateService.sendMessage(data.message);
      }
    })
  }
  update(id){
    this.router.navigate(['/translate/edit', id])
    //this.listOfTranslate = null;
  }
}
