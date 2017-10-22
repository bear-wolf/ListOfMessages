import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Translate} from "../../../models/translate"; // import our opaque token
import 'rxjs/Rx';

@Injectable()
export class TranslateService  {
  host: string;
  private message = new Subject<any>();
  private _dataIsChanged = new Subject<any>();

  private _currentLang: string;
  private _translations = {
    'ua': null,
    'ru': null,
    'en': null
  };

    // inject our translations
    constructor(
        public http: Http,
        public baseService: BaseService) {

        this.host = environment.host;

        // this.storeAsObservable = new Observable(observer=>{
        //
        // })

        this.baseService.getTranslateAll().subscribe((data) => {
            if (data.length) {
                this._translations.ua = data.json();
            }
        });
    }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }

  sendMessage(data) {
    this.message.next(data);
  }

  dataIsChanged(): Observable<any>{
      return this._dataIsChanged.asObservable();
  }

    updatePage(){
        return this._dataIsChanged.next({
            status: true
        });
    }

  public get currentLang() {
    return this._currentLang;
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
debugger;
  let options = new RequestOptions({ headers: headers});
  return this.http.post(this.host + '/translate/save', params, options)
        .map(res => {
          return res.json();
        })
        .catch((error: any) => {
          return Observable.throw(error);
        });
  }

  public get() {
    let headers = new Headers();

    headers.append('Accept', '*/*');

    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.host + '/translate', options)
        .map(res => {
          return res.json();
        })
        .catch((error: any) => {
          return Observable.throw(error);
        });
  }

    public getById(id) {
        let headers = new Headers();

        headers.append('Accept', '*/*');

        let options = new RequestOptions({ headers: headers});
        return this.http.get(this.host + '/translate/get/' + id, options)
            .map(res => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

  public remove(id:string) {
    let headers = new Headers();

    headers.append('Accept', '*/*');

    let params = new URLSearchParams();
    params.set('id', id);

    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.host + '/translate/remove', params, options)
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
