import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseDisplayerComponent } from './bookcase-displayer.component';

describe('BookcaseDisplayerComponent', () => {
  let component: BookcaseDisplayerComponent;
  let fixture: ComponentFixture<BookcaseDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookcaseDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookcaseDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
