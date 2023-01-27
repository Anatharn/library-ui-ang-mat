import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorHandlerComponent } from './library/author/author-handler/author-handler.component';
import { AuthorListComponent } from './library/author/author-list/author-list.component';
import { BookAuthorListComponent } from './library/book/book-author-list/book-author-list.component';
import { BookHandlerComponent } from './library/book/book-handler/book-handler.component';
import { BookListComponent } from './library/book/book-list/book-list.component';
import { BookRackAssociationComponent } from './library/book/book-rack-association/book-rack-association.component';
import { BookcaseHandlerComponent } from './library/bookcase/bookcase-handler/bookcase-handler.component';
import { BookcaseListComponent } from './library/bookcase/bookcase-list/bookcase-list.component';

const routes: Routes = [
  { path: "author", component : AuthorListComponent },
  { path: "author/handler", component : AuthorHandlerComponent },
  { path: "book", component : BookListComponent },
  { path: "book/handler", component: BookHandlerComponent },
  { path: "book/author", component: BookAuthorListComponent },
  { path: "book/rack", component: BookRackAssociationComponent },
  { path: "bookcase", component : BookcaseListComponent },
  { path: "bookcase/handler", component : BookcaseHandlerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
