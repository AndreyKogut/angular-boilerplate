export class Translations {
  static defaultLocale = 'en';

  static locales = [
    {
      [Translations.defaultLocale]: {
        value: Translations.defaultLocale,
        name: 'English',
        translationToken: '',
      },
    },
  ];

  static getLocales = (): any[] => Object.values(Translations.locales);

  static getLocalesTokens = (): string[] => Translations.getLocales().map(({ value }) => value);
}
