import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  user: User;
  isLoading = false;
  private mode = 'create';
  private userId: string;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.userId = paramMap.get('userId');
      this.isLoading = true;
      this.usersService.getUser(this.userId).subscribe(userData => {

        let user: any;
        user = userData.data;

        this.user = {
          id:  user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          email: user.email,
        };
        this.isLoading = false;
      });
    });
  }

}
