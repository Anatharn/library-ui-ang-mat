import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, mergeMap, Observable, Subscription, tap } from 'rxjs';
import { Bookcase } from '../domain/entity/Bookcase';
import { Rack } from '../domain/entity/Rack';
import { AbstractService } from './abstract.service';
import { RackService } from './rack.service';

@Injectable({
  providedIn: 'root'
})
export class BookcaseService extends AbstractService<Bookcase>{

  constructor(private http: HttpClient, private rackService: RackService) { 
    super(http, "bookcase");
  }
  newSelectedEntity(): Bookcase {
    return new Bookcase();
  }
  override selectEntity(entity: Bookcase): Bookcase {
      entity.capacity = entity.rackList.length;
      return super.selectEntity(entity);
  }
  override update(entity: Bookcase): Observable<Bookcase> {
      entity.rackList = [];
      return super.update(entity);
  }
  addBookcase(bookcase: Bookcase): Observable<Rack[]>{
    let persistedBookcase:Bookcase;
    return super.add(bookcase).pipe(
        tap(_ => persistedBookcase =_),
        mergeMap(_ => this.createRackList(bookcase.capacity)),
        mergeMap(persistedRackList => this.associateRackAndBookcase(persistedRackList, persistedBookcase))
      )
  }
  private createRackList(capacity: number): Observable<Rack[]>{
    console.log('createRackList', capacity);
    let tasks: Observable<Rack>[] = Array.from(
      { length: capacity }, 
      (_, index) => {
        let rack = new Rack(`${index}`);
        return this.rackService.add(rack);
      });
    return forkJoin(tasks);
  }
  private associateRackAndBookcase(rackList: Rack[],  bookcase: Bookcase): Observable<Rack[]> {
    console.log("associateRackAndBookcase", rackList);
    let f: Observable<Rack>[] = [];
    rackList.forEach(rack => {
      f.push(this.rackService.updateByOneUrl(rack._links['bookcase'].href, bookcase._links.self.href));
    });
    return forkJoin(f);
  }
}
