import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { NavigationComponent } from './library/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthorListComponent } from './library/author/author-list/author-list.component';
import { BookListComponent } from './library/book/book-list/book-list.component';
import { BookcaseListComponent } from './library/bookcase/bookcase-list/bookcase-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorHandlerComponent } from './library/author/author-handler/author-handler.component';
import { ConfirmDialogComponent } from './library/dialog/confirm-dialog/confirm-dialog.component';
import { BookHandlerComponent } from './library/book/book-handler/book-handler.component';
import { BookAuthorListComponent } from './library/book/book-author-list/book-author-list.component';
import { BookcaseHandlerComponent } from './library/bookcase/bookcase-handler/bookcase-handler.component';
import { BookRackAssociationComponent } from './library/book/book-rack-association/book-rack-association.component';
import { BookcaseDisplayerComponent } from './atom/bookcase-displayer/bookcase-displayer.component';
import { RackDisplayerComponent } from './atom/rack-displayer/rack-displayer.component';
import { AuthorListDisplayerComponent } from './atom/author-list-displayer/author-list-displayer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthorListComponent,
    BookListComponent,
    BookcaseListComponent,
    AuthorHandlerComponent,
    ConfirmDialogComponent,
    BookHandlerComponent,
    BookAuthorListComponent,
    BookcaseHandlerComponent,
    BookRackAssociationComponent,
    BookcaseDisplayerComponent,
    RackDisplayerComponent,
    AuthorListDisplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
