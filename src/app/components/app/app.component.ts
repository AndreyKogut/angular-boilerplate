import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'angular-boilerplate';

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.setDefaults();
  }
}
