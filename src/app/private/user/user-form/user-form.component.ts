import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  state: string;
  form: FormGroup; // Reactive form, campos do formulário

  constructor(
    private route: ActivatedRoute,
    private formBuider: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params.id) this.state = 'new';
      else this.state = 'edit';
    });

    this.form = this.formBuider.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: this.formBuider.control('', Validators.required),
      email: '',
    });
  }

  saveOrUpdate() {
    const user = new User();
    user.first_name = this.form.value.firstname;
    user.last_name = this.form.value.lastname;
    user.email = this.form.value.email;

    this.userService
      .save(user)
      .toPromise()
      .then((result: User) => {
        console.log(result);
        this.router.navigateByUrl('/app/user');
      })
      .catch((err) => {
        console.log(err);
        alert('Erro ao inserir usuário');
      })
      .finally(() => {
        console.log('terminou');
      });
  }

  get title() {
    return this.state === 'new' ? 'New user' : 'Edit user';
  }
}
