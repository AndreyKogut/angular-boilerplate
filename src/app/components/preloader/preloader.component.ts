import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: 'preloader.component.html',
  styleUrls: ['preloader.component.scss'],
})
export class PreloaderComponent {
  _scaleCoef: number;

  @Input()
  set scaleCoef(value: number) {
    this._scaleCoef = value >= 0 && value <= 1 ? value : 1;
  }
}
