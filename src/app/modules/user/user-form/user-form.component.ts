import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user-model';
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
        console.log('UserFormComponent');
      this.createFrom(null);
  }

    createFrom(data) {
        this.userForm = this.fb.group({
            'firstName': new FormControl(data ? data.firstName : '',  Validators.required),
            'lastName': new FormControl(data ? data.lastName : '',  Validators.required),
            'middleName': new FormControl(data ? data.middleName : '',  Validators.required),
            'id': new FormControl(data ? data._id : '')
        })
    }

    ngOnInit() {
        this.edit();
    }

    edit() {
        let id = this.route.snapshot.params.id;

        if (id) {
            this.userService.getById(id)
                .subscribe(data=>{
                    if (data.count) {
                        this.createFrom(data.body[0]);
                    }
                });
        }

    }

  onSubmit(value, valid) {
    if (valid) {
      let user = new User(value.firstName, value.lastName, value.middleName);

        user.id = value.id;

        this.userService
            .save(user)
            .subscribe((data)=>{
                if (data.status) {
                    this.userService.sendMessage(data.message);
                    this.router.navigate(['/users']);
                    this.userService.updatePage();
                }
            })
    }
  }
}
