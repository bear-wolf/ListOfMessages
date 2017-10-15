import { Injectable } from '@angular/core';
import {Participant} from '../../models/users';

@Injectable()
export class PartisipantServiceService {

  private participant: Array<Participant> = [];

  constructor() { }

  getAll() {
    return this.participant;
  }

  save(data: Participant) {
    this.participant.push(data);
  }

}
