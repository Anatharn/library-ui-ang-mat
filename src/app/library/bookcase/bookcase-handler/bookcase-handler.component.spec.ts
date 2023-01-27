import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseHandlerComponent } from './bookcase-handler.component';

describe('BookcaseHandlerComponent', () => {
  let component: BookcaseHandlerComponent;
  let fixture: ComponentFixture<BookcaseHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookcaseHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookcaseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
