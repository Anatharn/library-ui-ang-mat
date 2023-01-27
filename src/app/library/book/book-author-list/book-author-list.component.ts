import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Author } from 'src/app/domain/entity/Author';
import { Book } from 'src/app/domain/entity/Book';
import { Rack } from 'src/app/domain/entity/Rack';
import { HALPage } from 'src/app/domain/hal/HALPage';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-author-list',
  templateUrl: './book-author-list.component.html',
  styleUrls: ['./book-author-list.component.css']
})
export class BookAuthorListComponent implements OnInit {
  
  authors: Author[];
  book: Book;
  myControl = new FormControl<string | Author>('');
  options: Author[] = [];
  filteredOptions: Observable<Author[]> | undefined;
  page = new HALPage(1,5);
  sort = "lastName,asc";
  selectedAuthor: Author;

  
  constructor(private bookService: BookService, private authorService: AuthorService, private router: Router){
    this.authors = [];
    this.book = new Book("", "",[], new Rack(""))
    this.selectedAuthor = new Author("", "");
  }

  ngOnInit(): void {
    this.book = this.bookService.getSelectedEntity();
    if(!this.book){
      this.router.navigateByUrl("book");
    } else {
      this.authorService.findByUrl(this.book._links['authorList'].href).subscribe(aList => this.authors = aList._embedded['author']);
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.lastName;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    }
  }
  deleteAuthor(author: Author){
    console.log("delete author", author);
    this.authors = this.authors.filter(a => a._links !== author._links);
    this.synchronizeAuthorList();
  }
  submitForm(){
    console.log('submitForm', this.myControl, typeof this.myControl.value);
    if(typeof this.myControl.value === "object"){
      this.authors.push((this.myControl.value as Author));
      this.synchronizeAuthorList();
    } 
  }
  synchronizeAuthorList():void {
    this.authorService.updateByUrl(this.book._links['authorList'].href, this.authors.map(a => a._links.self.href)).subscribe(o=> console.log("update ", o));
    this.myControl.reset();
  }
  displayAuthor(author: Author){
    return author ? `${author.firstName} - ${author.lastName}` : ''; 
  }
  private _filter(value: string): Author[] {
    console.log("filter", value)
    this.authorService.findByName(value, this.page, this.sort).subscribe(embeddedAuthors => this.options = embeddedAuthors._embedded['author'])

    return this.options;
  }

}
