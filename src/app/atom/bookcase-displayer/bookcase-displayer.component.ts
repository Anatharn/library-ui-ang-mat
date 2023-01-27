import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Bookcase } from 'src/app/domain/entity/Bookcase';
import { Rack } from 'src/app/domain/entity/Rack';
import { BookcaseService } from 'src/app/service/bookcase.service';

@Component({
  selector: 'app-bookcase-displayer',
  templateUrl: './bookcase-displayer.component.html',
  styleUrls: ['./bookcase-displayer.component.css']
})
export class BookcaseDisplayerComponent implements OnChanges{

  //@Input() url: string | undefined;
  @Input() rack?: Rack;
  bookcase?: Bookcase;

  constructor(private bookcaseService: BookcaseService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", this.rack)
    if(!!this.rack) {
      console.log('bookcase ', this.rack._links['bookcase'].href);
      this.bookcaseService.findOne(this.rack._links['bookcase'].href).subscribe(b => 
        {
          console.log("bookcase ", b);
          this.bookcase = b;
        });
    }
  }

  
}
