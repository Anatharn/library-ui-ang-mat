import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Author } from 'src/app/domain/entity/Author';
import { Book } from 'src/app/domain/entity/Book';
import { HALPage } from 'src/app/domain/hal/HALPage';
import { HALResponse } from 'src/app/domain/hal/HALResponse';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { BookcaseService } from 'src/app/service/bookcase.service';
import { RackService } from 'src/app/service/rack.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  
  books: Book[];
  displayedColumns: string[] = ['id', 'title', 'authors', 'rack'];
  page: HALPage;
  sort = "title,asc";
  search = "";

  constructor(private bookService: BookService, private authorService: AuthorService, private rackService: RackService, private boocaseService: BookcaseService, private router: Router, public dialog: MatDialog){
    this.books = [];
    this.page = new HALPage(1,10);
  }
  
  ngOnInit(): void {
    this.getBooks();
  }

  onAuthorAssociate(book: Book){
    console.log("onAuthorAssociate", book);
    this.bookService.selectEntity(book);
    this.router.navigateByUrl("book/author");
  }

  onRackAssociate(book: Book){
    console.log("onRackAssociate", book);
    this.bookService.selectEntity(book);
    this.router.navigateByUrl("book/rack");
  }

  handlePageEvent(pageEvent: PageEvent){
    console.log("page event", pageEvent);
    this.page.number = pageEvent.pageIndex + 1;
    this.page.size = pageEvent.pageSize;
    this.getBooks();
    console.log("book", this.books);
  }

  sortData(sort: Sort) : void {
    console.log("sortData", sort);
    this.sort = `${sort.active},${sort.direction}`;
    this.getBooks();
  }

  onUpdate(book: Book) {
    console.log("update", book);
    this.bookService.selectEntity(book);
    this.router.navigateByUrl("/book/handler");
  }

  onDelete(book: Book) {
    console.log("delete", book);
    this.openDialog(book);
  }

  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result === 'yes' ){
        console.log('you can do it');
        this.bookService.delete(book).subscribe(_ => { 
          console.log('book has been deleted');
          this.getBooks();
        });
      }
    });
  }

  onChange() : void {
    console.log("onChange", this.search);
    this.getBooks();
  }
  private getBooks() {
    this.bookService.findByTitle(this.search, this.page, this.sort).subscribe(embeddedBook =>  {
      this.books = embeddedBook._embedded["book"];
      /*this.books.forEach(book => 
        {
          forkJoin([
            this.authorService.findByUrl(book._links['authorList'].href),
            this.rackService.findOne(book._links['rack'].href)]
          ).subscribe(([authorList,rack])  => {
            console.log("forJoin", authorList, rack);
            book.authorList = authorList._embedded['author'];
            book.rack = rack;
            if(!!rack)
            this.boocaseService.findOne(rack._links['bookcase'].href)
            .subscribe(b => book.rack.bookcase = b);
          });
        }
      )*/
      this.page.totalElements = embeddedBook.page.totalElements;
      this.page.totalPages = embeddedBook.page.totalPages;
    });
  }
}
