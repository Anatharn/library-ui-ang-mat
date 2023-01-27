import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookHandlerComponent } from './book-handler.component';

describe('BookHandlerComponent', () => {
  let component: BookHandlerComponent;
  let fixture: ComponentFixture<BookHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
