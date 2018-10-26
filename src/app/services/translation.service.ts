import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { flattenDeep } from 'lodash';
import * as moment from 'moment';
import { from, Observable, of } from 'rxjs';
import { flatMap, reduce, switchMap } from 'rxjs/operators';

import { LANG_TOKEN_NAME } from '../constants';
import { Translations } from '../models';
import { Translations as TranslationUtils } from '../utils';

import MessageInputType = Translations.MessageInputType;
import TranslateParam = Translations.TranslateParam;

const locales = TranslationUtils.getLocalesTokens();

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document) {}

  getInstantTranslation(key, params?) {
    this.translateService.instant(key, params);
  }

  setDefaults() {
    this.updateDocumentLang(TranslationUtils.defaultLocale);

    this.translateService.setDefaultLang(TranslationUtils.defaultLocale);

    const userLocale = localStorage.getItem(LANG_TOKEN_NAME);

    this.setLanguage(userLocale || TranslationUtils.defaultLocale);
  }

  setLanguage(locale: string) {
    if (locales.includes(locale)) {
      moment.locale(locale);

      this.translateService.use(locale);
      localStorage.setItem(LANG_TOKEN_NAME, locale);
      this.updateDocumentLang(locale);
    }
  }

  updateDocumentLang(locale) {
    this.document.documentElement.setAttribute('lang', locale);
  }

  transformMessage(inputData: MessageInputType, params?): Observable<string> {
    if (inputData) {
      return of(inputData).pipe(
        switchMap(value => (Array.isArray(value) ? from(flattenDeep(value as any).filter(val => !!val)) : of(value))),
        flatMap(
          (key: string | TranslateParam) =>
            typeof key === 'object'
              ? this.translateService.get(key.value, key.params)
              : this.translateService.get(key, params),
        ),
        reduce((sum, key) => `${sum} ${key}`, ''),
      );
    }

    return of();
  }
}
