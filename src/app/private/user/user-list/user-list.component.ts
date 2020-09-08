import { Component, OnInit } from '@angular/core';
import { UserListResponse } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  apiResponse: UserListResponse;

  activePage = 1;
  perPage = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(this.activePage);
  }

  public loadUsers(page: number) {
    this.activePage = page;

    this.userService
      .getUsers(page, this.perPage)
      .toPromise()
      .then((res: UserListResponse) => {
        console.log(res);
        this.apiResponse = res;
      })
      .catch((error) => {
        console.log(error);
        alert('Falha ao obter a lista de usuários');
      });
  }

  pages(size: number) {
    return new Array(size).keys();
  }
}
