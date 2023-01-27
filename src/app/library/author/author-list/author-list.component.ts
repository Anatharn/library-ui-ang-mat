import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Author } from 'src/app/domain/entity/Author';
import { HALPage } from 'src/app/domain/hal/HALPage';
import { AuthorService } from 'src/app/service/author.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit{

  authors: Author[];
  page: HALPage;
  sort: string;
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  search: string;

  constructor(private authorService: AuthorService, private  router: Router, public dialog: MatDialog){
    this.page = new HALPage(1,5);
    this.authors = [];
    this.sort = "lastName,asc";
    this.search = "";
  }

  ngOnInit() {
    this.getAuthors();
  }
  getAuthors(): void{
    this.authorService.findByName(this.search, this.page, this.sort)
    .subscribe(embeddedAuthor => {
      this.authors = embeddedAuthor._embedded['author'];
      this.page.totalElements = embeddedAuthor.page.totalElements;
      this.page.totalPages = embeddedAuthor.page.totalPages;
    });
  }
  onUpdate(author: Author): void {
    console.log("update", author);
    this.authorService.selectEntity(author);
    this.router.navigateByUrl("/author/handler");
  }
  onDelete(author: Author): void {
    console.log("delete", author);
    this.openDialog(author);
  }
  handlePageEvent(pageEvent: PageEvent){
    
    console.log("page event", pageEvent);
    this.page.number = pageEvent.pageIndex + 1;
    this.page.size = pageEvent.pageSize;
    this.getAuthors();
    console.log("authors", this.authors);
  }
  openDialog(author: Author): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result === 'yes' ){
        console.log('you can do it');
        this.authorService.delete(author).subscribe(author => { 
          console.log('author has been deleted');
          this.getAuthors();
        });
      }
    });
  }
  onChange() : void {
    console.log("onChange", this.search);
    this.getAuthors();
  }
  sortData(sort: Sort) : void {
    console.log("sortData", sort);
    this.sort = `${sort.active},${sort.direction}`;
    this.getAuthors();
  }
}
