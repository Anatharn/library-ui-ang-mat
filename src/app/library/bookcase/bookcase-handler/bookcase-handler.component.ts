import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookcase } from 'src/app/domain/entity/Bookcase';
import { BookcaseService } from 'src/app/service/bookcase.service';

@Component({
  selector: 'app-bookcase-handler',
  templateUrl: './bookcase-handler.component.html',
  styleUrls: ['./bookcase-handler.component.css']
})
export class BookcaseHandlerComponent implements OnInit{

  bookcase = new Bookcase();
  btnLabel = "";

  constructor(private bookcaseService: BookcaseService, private router: Router){}

  ngOnInit(): void {
    this.bookcase = this.bookcaseService.getSelectedEntity()
    this.btnLabel = (this.isUpdatable(this.bookcase)) ? "Modifier" : "Ajouter";
  }

  async submitForm(): Promise<void> {
    console.log('bookcase', this.bookcase);
    if(this.isUpdatable(this.bookcase)){
      this.bookcaseService.update(this.bookcase)
      .subscribe(_ => {
        console.log(_);
        this.router.navigateByUrl("/bookcase");
      });
    } else {
      this.bookcaseService.addBookcase(this.bookcase)
      .subscribe(_ => this.router.navigateByUrl("/bookcase"));
    }
  }

  private isUpdatable(bookcase: Bookcase): boolean {
    return !!bookcase._links && !!bookcase._links.self; 
  }
}
