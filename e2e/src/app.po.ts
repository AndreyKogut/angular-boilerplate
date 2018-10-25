import { browser, by, element } from 'protractor';

const navigateTo = () => browser.get('/');

const getParagraphText = () => element(by.css('app-root h1')).getText();

export class AppPage {
  navigateTo = navigateTo;
  getParagraphText = getParagraphText;
}
