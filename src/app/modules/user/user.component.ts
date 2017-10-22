import { Component, OnInit } from '@angular/core';
import {User} from './user-model';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    message: null;
    isLoad = true;
    listOfUsers: User[];

    constructor(
        private router : Router,
        private userService : UserService) {

    }

    ngOnInit() {
        console.log('UserComponent');

        this.userService.getMessage().subscribe((data)=>{
            if (data.status) {
                this.message = data.message;
            }
        })
        this.get();

        this.userService.dataIsChanged().subscribe((data)=>{
            if (data.status) {
                this.get();
            }
        })
    }

    get() {
        this.userService.get()
            .subscribe(data=>{
                if (data.status && data.count) {
                    this.listOfUsers = data.body;
                } else{
                    this.isLoad = false;
                    this.userService.sendMessage(data.message);
                }
            });
    }

    remove(id){
        this.userService.remove(id).subscribe((data)=>{
            if (data.status) {
                this.message = data.message;
                this.get();
            } else {
                this.userService.sendMessage(data.message);
            }
        })
    }
    update(id){
        this.router.navigate(['/users/edit', id])
        //this.listOfTranslate = null;
    }
}
