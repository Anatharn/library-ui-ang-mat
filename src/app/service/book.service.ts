import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../domain/entity/Book';
import { Rack } from '../domain/entity/Rack';
import { HALPage } from '../domain/hal/HALPage';
import { HALResponse } from '../domain/hal/HALResponse';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends AbstractService<Book>{

  constructor(private http: HttpClient) {
    super(http, "book");
   }

  newSelectedEntity(): Book {
    return new Book("", "", [], new Rack(""));
  }

  findByTitle(title: string, page: HALPage, sort: string) : Observable<HALResponse<Book>> {
    var url = super.buildUrlWithPaginationAndSorting("book/search/findByTitleContaining", page, sort) + "&title="+title;
    console.log('findByTitle', url);
    return this.http.get<HALResponse<Book>>(url);
  }

  override update(book: Book): Observable<Book>{
      book.authorList = [];
      return super.update(book);
  }
}
