import { Component, OnInit } from '@angular/core';
import {User} from './user-model';
import {UserService} from './user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users: User[];

    constructor(private userService : UserService) { }

    ngOnInit() {
        this.userService.getAll()
        //     .subscribe((data)=>{
        //     this.users = data;
        // });
    }
}
