import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/domain/entity/Book';
import { Rack } from 'src/app/domain/entity/Rack';
import { BookService } from 'src/app/service/book.service';
import { RackService } from 'src/app/service/rack.service';

@Component({
  selector: 'app-book-handler',
  templateUrl: './book-handler.component.html',
  styleUrls: ['./book-handler.component.css']
})
export class BookHandlerComponent implements OnInit{
  
  book = new Book("", "", [], new Rack(""));
  btnLabel = "";
  
  constructor(private bookService: BookService, private rackService: RackService, private router: Router) {

  }

  ngOnInit(): void {
    this.book = this.bookService.getSelectedEntity()
    this.btnLabel = (this.isUpdatable(this.book)) ? "Modifier" : "Ajouter";
  }

  submitForm(): void {
    console.log('book', this.book);
    if(this.isUpdatable(this.book)){
      this.bookService.update(this.book)
      .subscribe(_ => {
        console.log(_);
        
        this.router.navigateByUrl("/book");
      });
    } else {
      this.bookService.add(this.book)
        .subscribe(_ => {
          console.log(_);
          this.router.navigateByUrl("/book");
        });
    }
  }

  private isUpdatable(book: Book): boolean {
    return !!book._links && !!book._links.self; 

  }
}
