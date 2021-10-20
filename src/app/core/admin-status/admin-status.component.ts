import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../api/user/users.service";
import {HttpEvent} from "@angular/common/http";
import {LoginResponse} from "../../api/user/model/loginResponse";
import {AdminStatusService} from "./service/admin-status.service";
import {fadeInDownOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-status',
  templateUrl: './admin-status.component.html',
  styleUrls: ['./admin-status.component.css'],
  animations: [
    fadeInDownOnEnterAnimation({anchor: 'enter'}),
    fadeOutOnLeaveAnimation({anchor: 'leave'})]
})
export class AdminStatusComponent implements OnInit {


  constructor(private usersService: UsersService,
              private adminStatusService: AdminStatusService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.usersService.isLogged().subscribe(this.handleLoginStatus);
  }

  get name(): string {
    return this.adminStatusService.name;
  }

  get isOpen(): boolean {
    return this.adminStatusService.isOpen
  }

  private handleLoginStatus = (response: HttpEvent<LoginResponse>): void => {
    const loginResponse = (response as unknown as LoginResponse);
    if (loginResponse.isLogged) {
      this.adminStatusService.open(loginResponse.name);
    }
  };


  public logout(): void {
    this.usersService.logout().subscribe();
    this.adminStatusService.close();
    this.router.navigate(['']);
  }

  navigateToCms(): void {
    this.router.navigate(['admin/cms']).then()
  }
}
