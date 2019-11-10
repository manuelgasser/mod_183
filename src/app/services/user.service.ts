import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/model';
import {HttpClientService} from "@/services/httpclient.service";
import {LoggerModule, NGXLogger} from "ngx-logger";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
                private logger: NGXLogger,
                private httpService: HttpClientService) { }

    getAll() {
        this.logger.info("Load all users");
        return this.http.get<User[]>('http://localhost:8081/users');
    }

    register(user: User) {
        this.logger.info("User registered");
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }


    delete(id: number) {
        this.logger.info("User deleted");
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}