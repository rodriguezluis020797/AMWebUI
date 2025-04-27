import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSignUpComponent } from './complete-sign-up.component';

describe('CompleteSignUpComponent', () => {
  let component: CompleteSignUpComponent;
  let fixture: ComponentFixture<CompleteSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
