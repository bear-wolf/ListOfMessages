import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {Http, Headers, RequestMethod, RequestOptions, URLSearchParams} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Translate} from "../../../models/translate"; // import our opaque token

@Injectable()
export class TranslateService  {
  host: string;

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
  constructor(
      public http: Http,
      public baseService: BaseService) {

    this.host = environment.host;

        this.baseService.getTranslateAll().subscribe((data) => {
          if (data.length) {
              this._translations.ua = data.json();
          }
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

  public save(translate: Translate) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', '*/*');

  let params = new URLSearchParams();
  for(let key in translate){
      params.set(key, translate[key])
  }

  let options = new RequestOptions({ headers: headers});
  return this.http.post(this.host + '/translate/save', params, options)
        .map(res => {
          return res.json();
        })
        .catch((error: any) => {
          return Observable.throw(error);
        });
  }

  public getCurrentLang() {
    if (this._currentLang === 'ua') {
      return 'uk';
    } else {
      return this._currentLang;
    }
  }
}
