import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BaseService {
  host;
  private message = new Subject<any>();
  private _dataIsChanged = new Subject<any>();

  constructor(protected http: Http) {
    this.host = environment.host;
  }

  getMessage(): Observable<any> {
      return this.message.asObservable();
  }

  sendMessage(data) {
      if (data) {
          this.message.next(data);
      }
  }

  dataIsChanged(): Observable<any>{
      return this._dataIsChanged.asObservable();
  }

  protected jsonToURLSearchParams(json): URLSearchParams {
      let params = new URLSearchParams();
      for(let key in json){
          params.set(key, json[key])
      }

      return params;
  }

  updatePage(){
      return this._dataIsChanged.next({
          status: true
      });
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

    return this.http.get(`${this.host}/translate`, {
          headers: headers
        })
        .map(res => {
            return res.json();
        })
        .catch((error: any) => {
            return Observable.throw(error);
        });
  }

}
