import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Rack } from 'src/app/domain/entity/Rack';
import { RackService } from 'src/app/service/rack.service';

@Component({
  selector: 'app-rack-displayer',
  templateUrl: './rack-displayer.component.html',
  styleUrls: ['./rack-displayer.component.css']
})
export class RackDisplayerComponent implements OnChanges{

  @Input() url =  '';
  rack?: Rack;
  bookcaseUrl: string | undefined;

  constructor(private rackService: RackService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", this.url)
  this.rackService.findOne(this.url)
    .subscribe(r => {
      this.rack = r;
      if(this.rack){
        console.log('rack ', this.rack, this.rack._links['bookcase'].href);
        this.bookcaseUrl = this.rack._links['bookcase'].href;
      }
    });
  }
  
  ngOnInit(): void {
    
  }
}
