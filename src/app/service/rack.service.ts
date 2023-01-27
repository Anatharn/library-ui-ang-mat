import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rack } from '../domain/entity/Rack';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RackService extends AbstractService<Rack>{

  constructor(http: HttpClient) {
    super(http, "rack");
  }
  newSelectedEntity(): Rack {
    return new Rack("");
  }
}
