import { Injectable } from '@angular/core';
import { Modules } from '../models/modules';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

  private modules: any;

  constructor() {
    this.modules = [];
    this.modules.push(new Modules('Cообщения', 'messages'));
    this.modules.push(new Modules('Участники', 'participants'));
    this.modules.push(new Modules('Файлы', 'files'));
  }

  getModules(): Observable<Modules> {
    return Observable.of(this.modules);
  }

}
