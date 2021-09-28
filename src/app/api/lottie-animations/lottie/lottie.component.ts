import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AnimationItem} from 'lottie-web';
import {LottieAnimationsService} from '../service/lottie-animations.service';

@Component({
  selector: 'app-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieComponent implements OnInit, OnDestroy {
  @Input() lottieId: string | null;
  @Input() path: string | null;
  @Input() loop: boolean | null;
  @Input() autoPlay: boolean | null;
  @Input() width: string | null;
  @Input() height: string | null;
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private lottieService: LottieAnimationsService) {
    this.lottieId = null;
    this.path = null;
    this.loop = null;
    this.autoPlay = null;
    this.width = null;
    this.height = null;
  }

  private _animation: AnimationItem | undefined;

  get animation(): AnimationItem {
    return <AnimationItem>this._animation;
  }

  private _animationOptions: any;

  get animationOptions(): any {
    return this._animationOptions;
  }

  ngOnDestroy(): void {
    this.lottieService.removeAnimationById(this.lottieId);
  }

  ngOnInit(): void {
    this._animationOptions = {
      path: this.path,
      loop: this.loop,
      autoplay: this.autoPlay,
    };
    if (!this.lottieId) {
      this.lottieId = String(this.lottieService.length);
      console.log('New id', this.lottieId);
    }
    if (!this.path) {
      throw new Error('"path" can\'t be empty!');
    }
    this.lottieService.createLottie(this.lottieId, this.animationOptions);
  }

  animationCreated(animationItem: AnimationItem): void {
    this._animation = animationItem;
    this.animation.setSubframe(false);
    this.lottieService.addAnimationReference(this.lottieId, this.animation);
    this.isLoaded.emit(true);
  }
}
