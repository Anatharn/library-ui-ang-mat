import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Bookcase } from 'src/app/domain/entity/Bookcase';
import { Rack } from 'src/app/domain/entity/Rack';
import { HALPage } from 'src/app/domain/hal/HALPage';
import { BookcaseService } from 'src/app/service/bookcase.service';
import { RackService } from 'src/app/service/rack.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bookcase-list',
  templateUrl: './bookcase-list.component.html',
  styleUrls: ['./bookcase-list.component.css']
})
export class BookcaseListComponent implements OnInit{


  bookcases: Bookcase[] = [];
  displayedColumns: string [] = ["id", "name", "capacity"];
  page: HALPage = new HALPage(1,5);
  sort: string = "name,asc";

  constructor(private bookcaseService: BookcaseService, private rackService: RackService, private router: Router,  public dialog: MatDialog){}

  ngOnInit(): void {
    this.getBookcases();
  }

  getBookcases(): void {
    this.bookcaseService.findAllSort(this.page, this.sort).subscribe(embeddedBook =>  {
      this.bookcases = embeddedBook._embedded["bookcase"];
      this.bookcases.forEach(bookcase => this.rackService.findByUrl(bookcase._links['rackList'].href)
        .subscribe(rList => {
          bookcase.rackList = rList._embedded['rack'];
        }))
      this.page.totalElements = embeddedBook.page.totalElements;
      this.page.totalPages = embeddedBook.page.totalPages;
    });
  }
  handlePageEvent(pageEvent: PageEvent){
    console.log("page event", pageEvent);
    this.page.number = pageEvent.pageIndex + 1;
    this.page.size = pageEvent.pageSize;
    this.getBookcases();
    console.log("bookcases", this.bookcases);
  }
  onUpdate(bookcase: Bookcase) {
    console.log("update", bookcase);
    this.bookcaseService.selectEntity(bookcase);
    this.router.navigateByUrl("/bookcase/handler");
  }

  onDelete(bookcase: Bookcase) {
    console.log("delete", bookcase);
    this.openDialog(bookcase);
  }

  openDialog(bookcase: Bookcase): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result === 'yes' ){
        console.log('you can do it');
        let a:Observable<Rack>[] = [];
        bookcase.rackList.forEach(rack => a.push(this.rackService.delete(rack)));
        forkJoin(a)
          .subscribe(_ => {
            this.bookcaseService.delete(bookcase).subscribe(_ => { 
              console.log("rack has been deleted")
              console.log('bookcase has been deleted');
              this.getBookcases();
            });
        })
      }
    });
  }
}
