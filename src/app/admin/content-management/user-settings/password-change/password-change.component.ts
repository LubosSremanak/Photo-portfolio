import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {headShakeAnimation} from "angular-animations";
import {UsersService} from "../../../../api/user/users.service";
import {AdminStatusService} from "../../../../core/admin-status/service/admin-status.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
  animations: [headShakeAnimation({anchor: 'wrong'})],
})
export class PasswordChangeComponent implements OnInit {
  data: FormGroup;

  constructor(private usersService: UsersService,
              private adminStatusService: AdminStatusService,
              private router: Router,
              private snackBar: MatSnackBar
  ) {
    this.data = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
  }

  changePassword(data: any) {
    const name = this.adminStatusService.name;
    const password = data.value.oldPassword;
    const newPassword = data.value.newPassword;
    this.usersService.changePassword({
      name,
      password
    }, newPassword).subscribe(this.handleLogin);
  }

  private handleLogin = (response: any): void => {
    if (response.success) {
      this.openSnackBar();
      this.router.navigate(['/admin/cms'])
    } else {
      this.data.setErrors({wrongPassword: true});
    }
  };

  get newPassword() {
    return this.data.get('newPassword');
  }


  get oldPassword() {
    return this.data.get('oldPassword');
  }

  isValid(name: any): boolean {
    return name.invalid && (name.dirty || name.touched);
  }

  openSnackBar() {
    this.snackBar.open("Password changed successfully", 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
