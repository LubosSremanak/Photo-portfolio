import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
} from '@angular/core';
import { collapseAnimation } from 'angular-animations';

import { NavigationEnd, Router } from '@angular/router';
import {
  faInstagram,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AdminStatusService } from '../admin-status/service/admin-status.service';
import { LottieAnimationsService } from '../../shared/lottie-ls/service/lottie-animations.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [collapseAnimation({ duration: 300 })],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  readonly breakpoint: number = 900;
  readonly instagram: IconDefinition = faInstagram;
  readonly email: IconDefinition = faEnvelope;
  private height: number;
  constructor(
    private lottieService: LottieAnimationsService,
    private elementRef: ElementRef,
    private router: Router,
    private ngZone: NgZone,
    private adminStatusService: AdminStatusService
  ) {
    this.height = window.innerHeight;
    this._menuClick = true;
    this._isMenuRolled = false;
    this._isMenuRolling = false;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.isMenuOpenOnMobile()) {
        this.menuClicked();
      }
    });
  }

  private _isMenuRolled: boolean;

  get isMenuRolled(): boolean {
    return this._isMenuRolled;
  }

  set isMenuRolled(value: boolean) {
    this._isMenuRolled = value;
  }

  private _isMenuRolling: boolean;

  get isMenuRolling(): boolean {
    return this._isMenuRolling;
  }

  set isMenuRolling(value: boolean) {
    this._isMenuRolling = value;
  }

  private _menuClick: boolean;

  get menuClick(): boolean {
    return this._menuClick;
  }

  set menuClick(value: boolean) {
    this._menuClick = value;
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.menuClick = window.innerWidth >= this.breakpoint;
  }

  menuClicked() {
    this.ngZone.runOutsideAngular(() => {
      this._menuClick = !this._menuClick;
      if (this.menuClick) {
        document.body.style.overflow = 'hidden';
        this.lottieService.playAnimationInRange('menuButton', [30, 60], true);
      } else {
        document.body.style.overflow = 'auto';
        this.lottieService.playAnimationInRange('menuButton', [50, 30], true);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ngZone.runOutsideAngular(() => {
      document.body.style.overflow = 'auto';
      if (window.innerWidth <= 600) {
        return;
      }
      this.menuClick = window.innerWidth >= this.breakpoint;
      const height = window.innerHeight;
      this.lottieService.playAnimationInRange('menuButton', [50, 30], true);
    });
  }

  menuButtonInitialized(): void {
    this.lottieService.getAnimationById('menuButton')?.setSpeed(1.8);
  }

  hoverAnimation(id: string): void {
    this.lottieService.playAnimationInRange(id, [0, 60], true);
  }

  rollDone(event: any): void {
    this.isMenuRolled = true;
    this.isMenuRolling = false;
  }

  rollStart(event: any): void {
    this.isMenuRolling = true;
    this.isMenuRolled = false;
  }

  isMenuOpenOnMobile(): boolean {
    return this.menuClick && window.innerWidth <= this.breakpoint;
  }
}
