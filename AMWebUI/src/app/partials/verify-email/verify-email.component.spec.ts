import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEMailComponent } from './verify-email.component';

describe('VerifyEMailComponent', () => {
  let component: VerifyEMailComponent;
  let fixture: ComponentFixture<VerifyEMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
