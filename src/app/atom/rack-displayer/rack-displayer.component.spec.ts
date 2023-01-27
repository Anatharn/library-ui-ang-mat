import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackDisplayerComponent } from './rack-displayer.component';

describe('RackDisplayerComponent', () => {
  let component: RackDisplayerComponent;
  let fixture: ComponentFixture<RackDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
