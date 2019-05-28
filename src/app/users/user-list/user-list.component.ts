import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = false;
  private usersSub: Subscription;
  public pageSize = 5;

  totalUsers = 10;
  usersPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 3, 5, 10];

  pageEvent: PageEvent;

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
    this.usersSub = this.usersService.getUserUpdatedListener()
    .subscribe((users: User[]) => {
      this.isLoading = false;
      this.users = users;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
