import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {headShakeAnimation} from "angular-animations";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  animations: [headShakeAnimation({ anchor: 'wrong' })],
})
export class FieldComponent implements OnInit {
  @Input() data: FormGroup | undefined;
  @Input() type: string | undefined;
  @Input() formName!: string;
  @Input() customValidError: string | undefined;
  @Input() label: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  isValid(name: any): boolean {
    return name.invalid && (name.dirty || name.touched);
  }

  get field(): any {
    return this.data?.get(this.formName as string);
  }
}
