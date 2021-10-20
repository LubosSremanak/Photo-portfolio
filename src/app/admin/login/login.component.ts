import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from "../../api/user/users.service";
import {User} from "../../api/user/model/user";
import {Router} from "@angular/router";
import {AdminStatusService} from "../../core/admin-status/service/admin-status.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: FormGroup;

  constructor(private usersService: UsersService,
              private router: Router,
              private adminStatusService: AdminStatusService) {
    this.data = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
  }

  login(data: FormGroup): void {
    this.usersService.login(this.createUser(data)).subscribe(this.handleLogin);
  }

  private handleLogin = (response: any): void => {
    if (response.successfulLogin) {
      this.adminStatusService.open();
      this.router.navigate(['admin/cms']);
    }
  };

  createUser(data: FormGroup): User {
    return {
      name: data.value.name,
      password: data.value.password
    }
  }

  get name() {
    return this.data.get('name');
  }

  get password() {
    return this.data.get('password');
  }

  isValid(name: any): boolean {
    return name.invalid && (name.dirty || name.touched);
  }
}
