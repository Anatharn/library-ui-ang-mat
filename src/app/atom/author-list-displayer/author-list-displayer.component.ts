import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/domain/entity/Author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-list-displayer',
  templateUrl: './author-list-displayer.component.html',
  styleUrls: ['./author-list-displayer.component.css']
})
export class AuthorListDisplayerComponent implements OnInit{
  
  @Input() url: string = '';
  authors: Author[] = [];
  
  constructor(private authorService: AuthorService){}

  ngOnInit(): void {
    this.authorService.findByUrl(this.url)
      .subscribe(a => this.authors = a._embedded['author']);
  }

  
}
