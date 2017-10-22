import { Injectable } from '@angular/core';
import {User} from './user-model';
import {BaseService} from '../shared/base.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserService extends BaseService {

  private user: Array<User> = [];

  constructor(protected http: Http) {
      super(http);
      this.host += '/users';
  }

  public save(user: User) {
      let headers = new Headers();

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', '*/*');

      let params = this.jsonToURLSearchParams(user),
          options = new RequestOptions({
              headers: headers
          });

      return this.http.post(this.host + '/save', params, options)
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
      return this.http.get(this.host, options)
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
      return this.http.get(this.host + '/get/' + id, options)
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

      let params = this.jsonToURLSearchParams({
          id: id
      });

      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.host + '/remove', params, options)
          .map(res => {
              return res.json();
          })
          .catch((error: any) => {
              return Observable.throw(error);
          });
  }

}
