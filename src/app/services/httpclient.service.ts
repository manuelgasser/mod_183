import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {User} from '../user/user.component';

export class User {
  constructor(
    public userId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
     }

     getUsers() {
    return this.httpClient.get<User[]>('http://localhost:8081/users');
  }
}
