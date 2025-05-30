import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientNoteDetailsComponent } from './client-notes-details.component';

describe('ClientNoteDetailsComponent', () => {
  let component: ClientNoteDetailsComponent;
  let fixture: ComponentFixture<ClientNoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientNoteDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientNoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
