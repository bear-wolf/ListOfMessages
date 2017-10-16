import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class BaseService {
  host;

  constructor(protected http: Http) {
    this.host = environment.host;
  }

  getTranslateAll(): Observable<any> {
    let headers;
    headers = new Headers();
    // switch (window.location.hash) {
    //   // case '#ru': { headers.append('Accept-Language', 'ru'); break; }
    //   // case '#uk': { headers.append('Accept-Language', 'uk'); break; }
    //   // case '#en': { headers.append('Accept-Language', 'en'); break; }
    //   default: {
    //     headers.append('Accept-Language', 'uk');
    //     break;
    //   }
    // }

    headers.append('Accept-Language', 'uk');

    // return this.http.get(this.host + '/translate', {
    //   headers: headers
    // });

    return Observable.of([]);
  }

  getContent(key: string) {
    let headers = new Headers();

    headers.append('Accept', 'application/json');

    return this.http.get(this.host + '/content-pages/' + key, {
          headers: headers
        })
        .map(res => {
          return res.json();
        })
        .catch((error: any) => {
          return Observable.throw(error);
        })
  }

}
