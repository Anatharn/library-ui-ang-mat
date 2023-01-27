import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRackAssociationComponent } from './book-rack-association.component';

describe('BookRackAssociationComponent', () => {
  let component: BookRackAssociationComponent;
  let fixture: ComponentFixture<BookRackAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRackAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRackAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
