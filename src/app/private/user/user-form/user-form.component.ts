import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { User, SingleUserResponse } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  state;

  form: FormGroup;

  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get title() {
    if (this.state === 'new') return 'New user';
    if (this.state === 'edit') return 'Edit user';
    return 'User';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      job: this.formBuilder.control(''),
    });

    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params.id) {
        this.state = 'new';
      } else {
        this.userService
          .getUser(params['id'])
          .toPromise()
          .then((res: SingleUserResponse) => {
            this.user = res.data;
            this.state = 'edit';
            this.updateForm(this.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  updateForm(user: User) {
    this.form.controls.firstName.setValue(user.first_name);
    this.form.controls.lastName.setValue(user.last_name);
    this.form.controls.email.setValue(user.email);
    this.form.controls.job.setValue(user.job);
  }

  saveOrUpdate() {
    const u = new User();
    u.first_name = this.form.value.firstName;
    u.last_name = this.form.value.lastName;
    u.email = this.form.value.email;

    if (this.user) u.id = this.user.id;

    this.userService
      .createOrUpdate(u)
      .toPromise()
      .then((res) => {
        console.log(res);
        alert('Usuário salvo com sucesso');
      })
      .catch((err) => {
        console.log(err);
        alert('Falha ao salvar o usuário');
      })
      .finally(() => {
        this.router.navigateByUrl('/app/user');
      });
  }
}
