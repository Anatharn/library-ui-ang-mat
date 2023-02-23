import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';
import { Book } from 'src/app/domain/entity/Book';
import { Bookcase } from 'src/app/domain/entity/Bookcase';
import { Rack } from 'src/app/domain/entity/Rack';
import { HALPage } from 'src/app/domain/hal/HALPage';
import { BookService } from 'src/app/service/book.service';
import { BookcaseService } from 'src/app/service/bookcase.service';
import { RackService } from 'src/app/service/rack.service';

@Component({
  selector: 'app-book-rack-association',
  templateUrl: './book-rack-association.component.html',
  styleUrls: ['./book-rack-association.component.css']
})
export class BookRackAssociationComponent implements OnInit{
  
  bookcases: Bookcase[] = [];
  racks: Rack[] = [];
  page: HALPage = new HALPage(0, 10);
  selectedBookcase: Bookcase = new Bookcase();
  selectedRack: Rack = new Rack("");
  selectedBook: Book;

  constructor(private bookService: BookService, 
    private bookcaseService: BookcaseService, 
    private rackService: RackService,
    private router: Router){
    this.selectedBook = this.bookService.getSelectedEntity();
  }

  ngOnInit(): void {
    this.bookcaseService.findAllSort(this.page, "name,asc")
      .subscribe(embeddedBook => this.bookcases = embeddedBook._embedded["bookcase"]);
  }
  onChooseBookcase(opt: MatListOption[]) : void {
    console.log('onChooseBookcase' );
    opt.map(selectedOpt =>this.selectedBookcase = selectedOpt.value);
    
    //TODO what if the rack name is not a number
    this.rackService.findByUrl(this.selectedBookcase._links['rackList'].href)
        .subscribe(rList => {
          this.racks = rList._embedded['rack'].sort((a, b) => {
            let an = Number.parseInt(a.name);
            let bn = Number.parseInt(b.name)
            if(an > bn) {
              return 1;
            } else if (an < bn){
              return -1
            }
            return 0;
          });
        })
  }
  onChooseRack(opt: MatListOption[]) : void {
    console.log("onChooseRack");
    opt.map(selectedOpt => this.selectedRack = selectedOpt.value);

    this.bookService.updateByOneUrl(this.selectedBook._links['rack'].href, this.selectedRack._links['self'].href)
      .subscribe(_ => this.router.navigateByUrl("/book"));
  }
}
