import { Injectable } from '@angular/core';
import {Participant} from '../../models/participant';
import {Observable} from "rxjs";

@Injectable()
export class ParticipantService {

  private participant: Array<Participant> = [];

  constructor() { }

  public getAll() {
    return Observable.of(this.participant);
  }

  public save(data: Participant) {
    this.participant.push(data);

    return Observable.of(this.participant);
  }

}
