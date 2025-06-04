import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOccuredComponent } from './error-occured.component';

describe('ErrorOccuredComponent', () => {
  let component: ErrorOccuredComponent;
  let fixture: ComponentFixture<ErrorOccuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorOccuredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorOccuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
