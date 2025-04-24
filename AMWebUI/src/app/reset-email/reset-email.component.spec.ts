import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEMailComponent } from './reset-email.component';

describe('ResetEMailComponent', () => {
  let component: ResetEMailComponent;
  let fixture: ComponentFixture<ResetEMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetEMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetEMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
