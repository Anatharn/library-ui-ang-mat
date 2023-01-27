import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../domain/entity/Author';
import { HALPage } from '../domain/hal/HALPage';
import { HALResponse } from '../domain/hal/HALResponse';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends AbstractService<Author>{

  constructor(private http: HttpClient) {
    super(http, "author");
  }

  newSelectedEntity(): Author {
      return new Author("","");
  }

  findByName(name: string, page: HALPage, sort: string): Observable<HALResponse<Author>> {
    var url = super.buildUrlWithPaginationAndSorting("author/search/findByFirstNameContainingOrLastNameContaining", page, sort) + "&firstName="+name+"&lastName="+name;
    console.log('findByName', url);
    return this.http.get<HALResponse<Author>>(url);
  }

  override update(author: Author): Observable<Author>{
    console.log("url -> ", super.buildUrl("library/author"));
    return this.http.put<Author>(author._links.self.href, author)
    .pipe(
      catchError(this.handleError<Author>("update", author))
    );
  }
}

