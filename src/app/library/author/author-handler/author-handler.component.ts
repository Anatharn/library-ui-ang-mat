import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/domain/entity/Author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-handler',
  templateUrl: './author-handler.component.html',
  styleUrls: ['./author-handler.component.css']
})
export class AuthorHandlerComponent implements OnInit {

  author = new Author("", "");
  btnLabel = "";

  constructor(private authorService: AuthorService, private router: Router) { }
  
  ngOnInit(): void {
    this.author = this.authorService.getSelectedEntity()
    this.btnLabel = (this.isUpdatable(this.author)) ? "Modifier" : "Ajouter";
  }

  submitForm(): void {
    console.log('author', this.author);
    if(this.isUpdatable(this.author)){
      this.authorService.update(this.author)
      .subscribe(_ => {
        console.log(_);
        this.router.navigateByUrl("/author");
      });
    } else {
      this.authorService.add(this.author)
        .subscribe(_ => {
          console.log(_);
          this.router.navigateByUrl("/author");
        });
    }
  }

  isUpdatable(author: Author) : boolean {
    return (!!author._links && !!author._links.self);
  }
}
