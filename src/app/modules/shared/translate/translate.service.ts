import {Injectable} from '@angular/core';
import {BaseService} from "../base.service"; // import our opaque token

@Injectable()
export class TranslateService  {
  private _currentLang: string;
  private _translations = {
    'ua': null,
    'ru': null,
    'en': null
  };

  // private data: Observable;

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor(public baseService: BaseService) {
    this.baseService.getTranslateAll().subscribe((data) => {
      this._translations.ua = data.json();
    });
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
  }

  private translate(key: string): string {
    // private perform translation
    let translation = key;
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return translation;
  }

  public instant(key: string) {
    // call translation
    return this.translate(key);
  }

  public getCurrentLang() {
    if (this._currentLang === 'ua') {
      return 'uk';
    } else {
      return this._currentLang;
    }
  }
}
