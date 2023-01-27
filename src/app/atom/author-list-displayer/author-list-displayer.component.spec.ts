import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListDisplayerComponent } from './author-list-displayer.component';

describe('AuthorListDisplayerComponent', () => {
  let component: AuthorListDisplayerComponent;
  let fixture: ComponentFixture<AuthorListDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorListDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorListDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
