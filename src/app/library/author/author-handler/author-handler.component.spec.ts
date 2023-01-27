import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorHandlerComponent } from './author-handler.component';

describe('AuthorHandlerComponent', () => {
  let component: AuthorHandlerComponent;
  let fixture: ComponentFixture<AuthorHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
