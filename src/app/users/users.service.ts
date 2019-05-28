import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?per_page=${usersPerPage}&page=${currentPage}`;
    this.http
    .get<{ page: number, per_page: number, total: number, total_page: number, data: User[] }>(
      'https://reqres.in/api/users' + queryParams
    )
    .subscribe((res) => {

      this.users = res.data;

      this.usersUpdated.next([...this.users]);
    });
  }

  getUserUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string){
    return this.http.get<{ data: User[]}>
    ('https://reqres.in/api/users/' + id );
  }

}
