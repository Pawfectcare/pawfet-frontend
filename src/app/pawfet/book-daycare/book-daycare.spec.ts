import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDaycare } from './book-daycare';

describe('BookDaycare', () => {
  let component: BookDaycare;
  let fixture: ComponentFixture<BookDaycare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDaycare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDaycare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
