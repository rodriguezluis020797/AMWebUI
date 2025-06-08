import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPublicViewComponent } from './provider-public-view.component';

describe('ProviderPublicViewComponent', () => {
  let component: ProviderPublicViewComponent;
  let fixture: ComponentFixture<ProviderPublicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderPublicViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderPublicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
