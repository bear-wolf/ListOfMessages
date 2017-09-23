import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public modules: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
      this.getModules();
  }


  getModules() {
      this.dataService.getModules().subscribe(
          (data)=>{
              this.modules = data;
          })

  }

}
