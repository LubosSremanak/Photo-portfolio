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
  validate: boolean;

  constructor(private lottieService: LottieAnimationsService,
              private emailService: EmailService) {
    this.validate = true;
  }

  ngOnInit(): void {
    this.data = new FormGroup({
      name: new FormControl('', [
        Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email]),
      message: new FormControl('', [
        Validators.required
      ])
    });

  }

  disableValidation(): void {

  }

  sendMessage(data: FormGroup): void {
    data.markAllAsTouched();
    if (!data.invalid) {
      this.emailService.sendEmail(data).subscribe(this.emailSend);
    }

  }

  emailSend = () => {
    this.data.reset();
  };

  get name() {
    return this.data.get('name');
  }

  get email() {
    return this.data.get('email');
  }

  get message() {
    return this.data.get('message');
  }

  isValid(name: any): boolean {
    return name.invalid && (name.dirty || name.touched);
  }
}
