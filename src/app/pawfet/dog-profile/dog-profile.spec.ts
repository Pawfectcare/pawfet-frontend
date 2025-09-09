import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProfile } from './dog-profile';

describe('DogProfile', () => {
  let component: DogProfile;
  let fixture: ComponentFixture<DogProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
