import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsByDateComponent } from './interventions-by-date.component';

describe('InterventionsByDateComponent', () => {
  let component: InterventionsByDateComponent;
  let fixture: ComponentFixture<InterventionsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsByDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
