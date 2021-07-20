import {Component, OnInit} from '@angular/core';
import {LottieAnimationsService} from "../../shared/lottie-animations/service/lottie-animations.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../shared/email/email.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data: any;

  constructor(private lottieService: LottieAnimationsService,
              private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.data = new FormGroup({
      name: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.email]),
      message: new FormControl('', [Validators.required,
        Validators.minLength(1)])
    });
  }

  sendMessage(data: FormGroup): void {
    if (!data.invalid) {
      this.lottieService.getAnimationById('sendButton')?.setSpeed(1.8);
      this.lottieService.playAnimationInRange("sendButton", [0, 90], true);
      this.emailService.sendEmail(data).subscribe(this.emailSend);
    }

  }

  emailSend = () => {
    this.lottieService.playAnimationInRange("sendButton", [90, 0], true);
    this.data.reset();
  };


}
