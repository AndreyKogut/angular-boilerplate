import { Pipe, PipeTransform } from '@angular/core';

import { Translations } from '../models';
import { TranslationService } from '../services';

import MessageInputType = Translations.MessageInputType;

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  valueToReturn = '';

  constructor(private translationService: TranslationService) {}

  transform(keysList: MessageInputType, params?): string {
    this.translationService.transformMessage(keysList, params).subscribe(value => {
      this.valueToReturn = value.trim();
    });

    return this.valueToReturn;
  }
}
