import {Injectable} from '@angular/core';
import {Lottie} from '../model/lottie';
import {AnimationItem, AnimationSegment} from 'lottie-web';

@Injectable({
  providedIn: 'root'
})
export class LottieAnimationsService {
  private readonly animations: Lottie[];

  constructor() {
    this.animations = [];
  }

  get length(): number {
    return this.animations.length;
  }

  public getIndexInArrayById(id: string | null): number {
    return this.animations.findIndex(animation => animation.id === id);
  }

  public removeAnimationById(id: string | null): void {
    const index: number = this.getIndexInArrayById(id);
    this.animations.splice(index, 1);
  }

  public getLastAnimation(): Lottie {
    const numberOfTabs: number = this.animations.length;
    return this.animations[numberOfTabs - 1];
  }

  public removeLastAnimation(): void {
    this.animations.pop();
  }

  public createLottie(id: string, options: any): void {
    const animation = new Lottie(id, options);
    this.animations.push(animation);
  }

  public getAnimationById(id: string): AnimationItem | undefined {
    const animation: Lottie | undefined = this.animations.find(animation => animation.id === id);
    if (animation) {
      return animation.reference;
    }
    return undefined;
  }

  public getOptions(id: string): any {
    const lottie: Lottie | undefined = this.getLottieById(id);
    if (lottie) {
      return lottie.options;
    }
  }

  public playAnimationInRange(id: string, frames: number[], playNow: boolean): void {
    const animation: AnimationItem | undefined = this.getAnimationById(id);
    if (animation) {
      animation.playSegments(frames as AnimationSegment, playNow);
    }
  }

  public addAnimationReference(id: string | null, reference: AnimationItem): void {
    const lottie: Lottie | undefined = this.getLottieById(id)
    if (lottie) {
      lottie.reference = reference;
    }
  }

  private getLottieById(id: string | null): Lottie | undefined {
    if (id) {
      return this.animations.find(animation => animation.id === id);
    }
    return undefined;
  }
}
