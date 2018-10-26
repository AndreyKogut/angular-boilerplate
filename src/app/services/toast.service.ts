import { Injectable } from '@angular/core';

import { TranslationService } from './translation.service';

@Injectable()
export class ToastService {
  constructor(private translateService: TranslationService) {}

  showSuccess(key, params?) {
    this.showMessage('showSuccess', key, params);
  }

  showError(key, params?) {
    this.showMessage('showError', key, params);
  }

  showWarning(key, params?) {
    this.showMessage('showWarning', key, params);
  }

  showMessage(showType, key, params?) {
    this.translateService.transformMessage(key, params).subscribe(message => {
      // Handle toast popup
    });
  }
}
