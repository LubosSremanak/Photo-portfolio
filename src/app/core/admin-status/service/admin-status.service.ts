import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminStatusService {
  private _isOpen: boolean;
  private _name: string;

  get name(): string {
    return this._name;
  }

  constructor() {
    this._isOpen = false;
    this._name = 'Admin'
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  open(name?: string): void {
    if (name)
      this._name = name;
    this._isOpen = true;
  }

  close(): void {
    this._isOpen = false;
  }
}
